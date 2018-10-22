'use strict';

const Hapi = require('hapi');
const azure = require('azure-storage');

const tableService = azure.createTableService(process.env.CUSTOMCONNSTR_cosmosTables);
const config = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    router: {
        isCaseSensitive: false,
        stripTrailingSlash: true
    }
};
const server = new Hapi.Server(config);

const init = async () => {
    await server.start();
};

server.route({
    method: 'GET',
    path: '/states',
    handler: function (request, h) {

        const query = new azure.TableQuery()
        .where("PartitionKey eq 'irs-data'");

        let promise = new Promise((resolve, reject) => {
            tableService.queryEntities('states', query, null, (err, result, response) => {
                if (err) {
                    reject(err)
                }
                resolve(result.entries);
            })
        }, reject => {
                throw reject;
        });

        return promise;
    }
});

process.on('UnhandledRejection', (err) => {
    console.error(err);
    process.exit(1)
});

init();

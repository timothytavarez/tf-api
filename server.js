'use strict';

const Hapi = require('hapi');
const azure = require('azure-storage');
const config = require('./config/tableconfig');

const tableService = azure.createTableService(config.accountName, config.key, config.endpoint);
const entGen = azure.TableUtilities.entityGenerator;

const server = Hapi.server({
    port: '3000',
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
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

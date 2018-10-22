'use strict';

const Hapi = require('hapi');
const azure = require('azure-storage');
const config = require('./config/tableconfig');
const hapiConfig = require('./config/hapiconfig');

const tableService = azure.createTableService(config.accountName, config.key, config.endpoint);

const server = Hapi.server({
    port: process.env.port,
    host: process.env.host
});

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

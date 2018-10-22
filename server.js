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

        let stateData = [
            {
                name: 'Colorado',
                totalIRSCollections: 56742235,
                businessIncome: 2899495,
                individualIncomeTaxWithheldFICA: 40798082,
                individualIncomeTaxPaymentsSECA: 11470155
            },
    
            {
                name: 'California',
                totalIRSCollections: 440475243,
                businessIncome: 47274455,
                individualIncomeTaxWithheldFICA: 288364748,
                individualIncomeTaxPaymentsSECA: 90271160
            }
        ];

        stateData = JSON.stringify(stateData);
        
        return h.response(stateData)
            .type('application/json');
        
    }
});


process.on('UnhandledRejection', (err) => {
    console.error(err);
    process.exit(1)
});

init();

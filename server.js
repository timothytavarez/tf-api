'use strict';

const Hapi = require('hapi');
// const azure = require('azure-storage');

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
        return 'Success!';
    }
});

server.route({
    method: 'POST',
    path: '/states/new',
    handler: function (request, h) {
        
    }
});

process.on('UnhandledRejection', (err) => {
    console.error(err);
    process.exit(1)
});

init();

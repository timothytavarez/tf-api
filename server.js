'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: '3000',
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log(`Server started on host ${server.port} via port ${server.port}`);
}

process.on('UnhandledRejection', (err) => {
    console.error(err);
    process.exit(1)
});

init();
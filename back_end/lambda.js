const serverlessExpress = require('aws-serverless-express');
const app = require('./index_servidor'); // Importa o app configurado
const server = serverlessExpress.createServer(app);

exports.handler = (event, context) => {
    return serverlessExpress.proxy(server, event, context);
};

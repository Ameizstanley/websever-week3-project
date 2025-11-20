const swaggerAutogen = require('swagger-autogen')()
const utilities = require('./utilities')

const doc = {
    info: {
        title: 'subscriber API',
        description: 'API to manage subscribers',
    },
    host: 'localhost:3000',
    schemes: ['http'],
}
const outputFile = './swagger-output.json'
const endpointsFiles = ['./router/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);
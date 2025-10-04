const swaggetAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'cse341-final-project-izpp.onrender.com',
    schemes: ['https']
}

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggetAutogen(outputFile, endpointsFiles, doc);
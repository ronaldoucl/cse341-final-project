const swaggetAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'cse-341-project2-loor.onrender.com',
    schemes: ['https']
}

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggetAutogen(outputFile, endpointsFiles, doc);
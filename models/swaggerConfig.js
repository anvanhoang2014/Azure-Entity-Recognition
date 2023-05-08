const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Azure Enitity Recognition API',
        version: '1.0.0',
        description: 'The API serves as an intermediary between the Client and Azure Cognitive Service for Language. It operates as a RESTful API that utilizes HTTP requests for both data retrieval and submission.',
      },
      servers: [
        {
          url: `http://${process.env.HOST}:${process.env.PORT}/`,
        },
      ],
    },
    apis: ['./models/swagger.js'],
};

module.exports = options;
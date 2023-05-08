const express = require('express');
const entityRoutes = require('./routes/entityRoutes');
const apiRoutes = require('./routes/apiRoutes');
const mainRoutes = require('./routes/mainRoutes');
//const swaggerDoc = require('./models/swagger.js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



/*
app.get('/', (req, res) => {
    res.render('index.ejs');
  });

app.get('/test', (req, res) => {
  throw new Error('Something went wrong');
});
*/

app.use('/', mainRoutes);

app.use('/entity', entityRoutes);

app.use('/api', apiRoutes);

//swaggerDoc(app);


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API description',
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}/`,
      },
    ],
  },
  apis: ['./models/swagger.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use((req, res, next) => {
  const err = new Error(`The server cannot locate ${req.url}`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) =>{
 if(!err.status) {
     err.status = 500;
     err.message = ("Internal Server Errr");
 }
 res.status(err.status);
 res.render('error', {error: err});
});


//app.use('/API/', entityRoutes);

app.listen(process.env.PORT || 8000);

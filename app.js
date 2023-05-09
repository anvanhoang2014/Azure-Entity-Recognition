const express = require('express');
const entityRoutes = require('./routes/entityRoutes');
const apiRoutes = require('./routes/apiRoutes');
const mainRoutes = require('./routes/mainRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const options = require('./models/swaggerConfig');
require('dotenv').config();


const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', mainRoutes);

app.use('/entity', entityRoutes);

app.use('/api', apiRoutes);


const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', '*');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const err = new Error(`The server cannot locate ${req.url}`);
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) =>{
 if(!err.status) {
     err.status = 500;
     err.message = ("Internal Server Error");
 }
 res.status(err.status);
 res.render('error', {error: err});
});


app.listen(process.env.PORT || 8000);

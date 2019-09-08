'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
const routes = require('./routes/router.js/index.js');
const routes2 = require('./routes/router2.js/index.js');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

//app level middleware
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(routes);
app.use(routes2);
const options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    produces: [
      'application/json',
    ],
    schemes: ['http'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/*.js'],//Path to the API handle folder
};

expressSwagger(options);


//error handler
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server is up on ${port}`);
    });
  },
};

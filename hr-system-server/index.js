const express = require('express');
const cors = require('cors');
const expressPinoLogger = require('express-pino-logger');
const bodyParser = require('body-parser');
const logger = require('./api/services/logger.service');
const { dbInit } = require('./api/services/db-connector.service');
const customErrorHandler = require('./api/error/errorHandler');

// Logger middleware
const loggerMiddleware = expressPinoLogger({
  logger: logger,
  autoLogging: true,
});

// Initiate App Dependencies
require('./init')();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(cors());
app.use(express.static('public'));

app.use(`/api/${envConfig.API_VERSION}`, require('./api/routes/monthly-count.route'));
app.use(`/api/${envConfig.API_VERSION}`, require('./api/routes/role.route'));

// Custom Error Handler
app.use(customErrorHandler);

// Listening to the port
app.listen(envConfig.API_PORT, envConfig.API_HOST, async () => {
  console.debug(`Listening on port ${envConfig.API_PORT}.`);
  // globalThis['dbConn'] = await dbInit();
  // require('./api/models/');
});

const logErrorHandler = async (error) => {
  console.error(error);
  // process.exit(1);
};

const terminationHandler = async (error) => {
  console.error(error);

  // console.debug('Closing DB Connection...');
  // await dbTearDown(dbConn);
  // console.debug('DB Connection closed.');

  process.exit(0);
};

process.on('uncaughtException', logErrorHandler);
process.on('unhandledRejection', logErrorHandler);
process.on('SIGTERM', terminationHandler);
process.on('SIGINT', terminationHandler);

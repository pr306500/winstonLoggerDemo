/*
Winston is used making log files or to track the log events.
While execution of the code, different events take place which are needed to
be logged in a file so that we could understand the behaviour
of the API whether it's working fine or not.
*/
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');
// winstonRotator creates a new log file every day.
const logDir = 'log';
const tsFormat =  () => (new Date()).toLocaleTimeString();
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}


/*
There are 6 logging levels:

  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5

*/

/*
Colorize Winston console log output via winston.transports.Console.
Add timestamps to the log entries
*/
/*
In winston a transport is essentially a storage device for your logs.
Each instance of a winston logger can have multiple transports configured at different levels
*/
consoleConfig = [
  new winston.transports.Console({
    'colorize': true,
    'timestamp':true
  }),
  new (winstonRotator)({
  filename: `${logDir}/-results.log`,// define the directory where the log files will get generated.
  timestamp: tsFormat,
  datePattern: 'yyyy-MM-dd',
  prepend: true,
  level: env === 'development' ? 'verbose' : 'info'// defines the logger level.
})
]

/*
In winston.Logger we pass transport array as an argument.
We have made the configuration of transport above in consoleConfig variable.
*/
createLogger = new winston.Logger({
  transports:consoleConfig
})

/*
  We can make our own customized logger i.e. successLogger & errorLogger.
*/
const successLogger = createLogger;
successLogger.add(winstonRotator, {
  'name': 'access-file',
  'level': 'info',
  'filename': './logs/access.log',
  'json': false,
  'prepend': true
});

const errorLogger = createLogger;
errorLogger.add(winstonRotator, {
  'name': 'error-file',
  'level': 'error',
  'filename': './logs/error.log',
  'json': false,
  'prepend': true
});

const variable = "I am happy";
const error = "Error is here";

successLogger.info(`Success Message and variables: ${variable}`);
errorLogger.error(`Error Message : ${error}`);

/* Log to a file in addition to the console */

createLogger.debug('Debugging info');
createLogger.verbose('Verbose info');
createLogger.info('Hello world');
createLogger.warn('Warning message');
createLogger.error('Error info');

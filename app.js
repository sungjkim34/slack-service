var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var socketIO = require('socket.io');
var mysql = require('mysql');
var cors = require('cors');
var moment = require('moment');
var winston = require('winston');
var fs = require('fs');

// const ENV = require('./env');
// const CONST = require('./const');
const ENV = {
  port: 3004
}

var app = express();
var server = http.Server(app);
var io = socketIO(server);
// var con = mysql.createConnection(ENV.con);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
server.listen(ENV.port, () => console.log('Starting server on port ' + ENV.port));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));

const logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'debug'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: 'debug'
    })
  ]
});

// Routing
// require('./routes/chat')(app, con, io, moment, logger);
require('./routes/chat')(app, io, moment, logger);
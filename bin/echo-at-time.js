#!/usr/bin/env node

'use strict';

const http = require('http');
const tryToCatch = require('try-to-catch');

const middleware = require('../lib/middleware');
const echo = require('../lib/echo');
const catchHandler = require('../lib/catch-handler');

const {log} = console;

process.on('unhandledRejection', error => {
    log('unhandledRejection', error);
});

const server = http
    .createServer(catchHandler(middleware, echo(onEcho)))
    .listen(3000);

function onEcho(time, message) {
    log(time, message);
}


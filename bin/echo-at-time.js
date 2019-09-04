#!/usr/bin/env node

'use strict';

const http = require('http');

const tryToCatch = require('try-to-catch');

const catchHandler = require('../lib/catch-handler');
const echo = require('../lib/echo');
const middleware = require('../lib/middleware');
const redis = require('../lib/redis');

const {log} = console;
const {REDIS_URL} = process.env;

const onEcho = (time, message) => log(time, message);

main()
    .catch(console.error);

async function main() {
    const redisClient = redis.create(REDIS_URL);
    
    const remove = redis.remove(redisClient);
    const add = redis.add(redisClient)
    
    const doEcho = echo(onEcho, {
        remove,
    });
    
    http
        .createServer(catchHandler(middleware, {add, doEcho}))
        .listen(3000);
    
    const allTimes = await redis.getAll(redisClient);
    
    for (const [time, message] of allTimes) {
        await doEcho(time, message);
    }
}

process.on('unhandledRejection', (error) => {
    log('unhandledRejection', error);
});


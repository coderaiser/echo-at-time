#!/usr/bin/env node

'use strict';

const http = require('http');

const catchHandler = require('../lib/catch-handler');
const timeout = require('../lib/timeout');
const redis = require('../lib/redis');
const middleware = require('../lib/middleware');
const {detach} = require('../lib/uniq');

const {log} = console;
const {PORT = 3000, REDIS_URL} = process.env;

const onEcho = (time, message) => {
    log(detach(time), message);
};

main()
    .catch(console.error);

async function main() {
    const redisClient = redis.create(REDIS_URL);
    
    const remove = redis.remove(redisClient);
    const add = redis.add(redisClient);
    
    const doEcho = timeout(onEcho, {
        remove,
    });
    
    http.createServer(catchHandler({
        middleware,
        runners: {
            add,
            doEcho,
        },
    }))
    
    http.listen(PORT);
    
    log(`server started at: http://localhost:${PORT}`);
    const allTimes = await redis.getAll(redisClient);
    
    for (const [time, message] of allTimes)
        await doEcho(time, message);
}

process.on('unhandledRejection', (error) => {
    log('unhandledRejection', error);
});


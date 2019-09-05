'use strict';

const redis = require('async-redis');
const NAME = 'echoAtTime';

const {detachKey} = require('./uniq');

module.exports._NAME = NAME;

module.exports.create = (url) => {
    return redis.createClient(url);
};

module.exports.add = (client) => async (time, message) => {
    if (await isDuplicate(client, time, message))
        return;
    
    await client.hmset(NAME, time, message);
};

module.exports.getAll = async (client) => {
    const all = await getAll(client);
    return Object.entries(all);
};

module.exports.remove = (client) => async (time) => {
    return await client.hdel(NAME, time);
};

async function getAll(client) {
    return await client.hgetall(NAME) || {};
}

async function isDuplicate(client, newTime, newMessage) {
    const all = await getAll(client);
    const entries = Object
        .entries(all)
        .map(detachKey);
    
    for (const [time, message] of entries) {
        if (time === newTime && message === newMessage)
            return true;
    }
    
    return false;
}


'use strict';

const redis = require('async-redis');
const NAME = 'echoAtTime';

const {keys} = Object;

module.exports.create = (url) => {
    return redis.createClient(url);
};

module.exports.add = (client) => async (time, message) => {
    const all = await getAll(client);
    
    await client.hmset(NAME, {
        ...all,
        time: message,
    });
};

module.exports.getAll = async (client) => {
    const all = await getAll(client);
    return Object.entries(all);
};

module.exports.remove = (client) => async (time) => {
    const all = await getAll(client);
    delete all[time];
    
    if (!keys(all).length)
        return;
    
    await client.hmset(NAME, all);
};

async function getAll(client) {
    return await client.hgetall(NAME) || {};
}


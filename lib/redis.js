'use strict';

const redis = require('async-redis');
const NAME = 'echoAtTime';

module.exports.create = (url) => {
    return redis.createClient(url);
};

module.exports.add = (client) => async (time, message) => {
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


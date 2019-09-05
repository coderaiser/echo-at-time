'use strict';

const pullout = require('pullout');
const tryToCatch = require('try-to-catch');
const {attach} = require('./uniq');

const isBadRequest = (req) => req.method !== 'POST' || req.url !== '/echoAtTime';

module.exports = async ({add, doEcho}, req, res) => {
    if (isBadRequest(req))
        return sendBadRequest(res);
    
    const [e, result] = await tryToCatch(parseRequest, req);
    
    if (e)
        return sendError(e, res);
    
    const {time, message} = result;
    
    const attachedTime = attach(time);
    await add(attachedTime, message);
    await doEcho(attachedTime, message);
    
    res.writeHead(200)
        .end('ok');
};

async function parseRequest(req) {
    const data = await pullout(req);
    const {time, message} = JSON.parse(data);
    
    if (!time)
        throw Error('no time!');
    
    if (new Date(time).toString() === 'Invalid Date')
        throw Error('Invalid Date');
    
    if (!message)
        throw Error('no message!');
    
    return {
        time,
        message,
    };
}

module.exports.sendError = sendError;
function sendError(error, res) {
    return res
        .writeHead(400)
        .end(error.stack);
}

function sendBadRequest(res) {
    return res
        .writeHead(400)
        .end('bad request');
}


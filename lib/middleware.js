'use strict';

const pullout = require('pullout');
const tryToCatch = require('try-to-catch');

const isBadRequest = (req) => req.method !== 'POST' || req.url !== '/echoAtTime';

module.exports = async (echo, req, res) => {
    if (isBadRequest(req))
        return sendBadRequest(res);
    
     const [e, result] = await tryToCatch(parseRequest, req);
     
     if (e)
         return sendError(e, res);
     
     const {time, message} = result;
     
     echo(time, message);
     
     res.writeHead(200)
        .end('ok');
}

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
        .end(error.message);
}

function sendBadRequest(res) {
    return res
        .writeHead(400)
        .end('bad request');
}

function sendWrongFormat(res) {
     return res
        .writeHead(400)
        .end('wrong message format');
}


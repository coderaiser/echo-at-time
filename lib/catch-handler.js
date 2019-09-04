'use strict';

const tryToCatch = require('try-to-catch');
const sendError = require('./middleware');

module.exports = (fn, echo) => async (req, res) => {
    const [e] = await tryToCatch(fn, echo, req, res);
    
    if (e)
        sendError(e, res);
};


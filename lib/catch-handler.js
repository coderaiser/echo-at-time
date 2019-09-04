'use strict';

const tryToCatch = require('try-to-catch');
const {sendError} = require('./middleware');

module.exports = (fn, data) => async (req, res) => {
    const [e] = await tryToCatch(fn, data, req, res);
    
    if (e)
        sendError(e, res);
};


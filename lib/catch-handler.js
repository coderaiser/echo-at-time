'use strict';

const tryToCatch = require('try-to-catch');
const {sendError} = require('./middleware');

module.exports = ({middleware, runners}) => async (req, res) => {
    const [e] = await tryToCatch(middleware, runners, req, res);
    
    if (e)
        sendError(e, res);
};


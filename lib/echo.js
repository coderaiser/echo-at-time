'use strict';

const wraptile = require('wraptile');

module.exports = (fn) => (time, message) => {
    const futureTime = new Date(time).getTime();
    const now = Date.now();
    const delta = futureTime - now;
    
    if (delta <= 0)
        return fn(time, message);
    
    setTimeout(wraptile(fn, time, message), delta);
};


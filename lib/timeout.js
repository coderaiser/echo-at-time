'use strict';

const {detach} = require('./uniq');

const timeout = (fn, time, message, remove) => async () => {
    fn(time, message);
    await remove(time);
};

module.exports = (fn, {remove}) => async (time, message) => {
    const futureTime = new Date(detach(time)).getTime();
    const now = Date.now();
    const delta = futureTime - now;
    
    if (delta <= 0) {
        fn(time, message);
        await remove(time);
        return;
    }
    
    setTimeout(timeout(fn, time, message, remove), delta);
};


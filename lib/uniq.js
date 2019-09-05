'use strict';

const detach = (a) => a.replace(/\^.*/, '');

const incrementor = () => {
    let i = 0;
    return () => {
        return ++i;
    };
};

const incCount = incrementor();

module.exports.attach = (a) => {
    return `${a}^${incCount()}`;
};

module.exports.detach = detach;

module.exports.detachAll = ([key, value]) => {
    return [
        detach(key),
        value,
    ];
};


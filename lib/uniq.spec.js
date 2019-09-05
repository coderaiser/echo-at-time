'use strict';

const test = require('supertape');
const {reRequire} = require('mock-require');

test('echo-at-time: uniq: attach', (t) => {
    const {attach} = reRequire('./uniq');
    const str = 'hello';
    const result = attach(str);
    const expected = 'hello^1';
    
    t.equal(result, expected);
    t.end();
});

test('echo-at-time: uniq: detach', (t) => {
    const {detach} = reRequire('./uniq');
    const str = 'hello^1';
    const result = detach(str);
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});


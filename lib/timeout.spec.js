'use strict';

const {promisify} = require('util');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const timeout = require('./timeout');

const wait = promisify((time, fn) => {
    setTimeout(fn, time);
});

test('echo-at-time', async (t) => {
    const remove = stub();
    const fn = stub();
    const run = timeout(fn, {
        remove,
    });
    
    const time = new Date().toISOString();
    const message = 'hello';
    
    await run(time, message);
    
    t.ok(fn.calledWith(time, message), 'should call fn');
    t.end();
});

test('echo-at-time: later', async (t) => {
    const remove = stub();
    const fn = stub();
    const run = timeout(fn, {
        remove,
    });
    
    const time = Date.now + 1000;
    const message = 'hello';
    
    await run(time, message);
    
    t.notOk(fn.called, 'should call fn later');
    t.end();
});

test('echo-at-time: remove after 1 second', async (t) => {
    const remove = stub();
    const fn = stub();
    const run = timeout(fn, {
        remove,
    });
    
    const time = Date.now + 500;
    const message = 'hello';
    
    await run(time, message);
    await wait(500);
    
    t.ok(remove.called, 'should call remove');
    t.end();
});


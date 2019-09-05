'use strict';

const test = require('supertape');
const mockRequire = require('mock-require');
const {reRequire} = mockRequire;
const stub = require('@cloudcmd/stub');

const redis = require('./redis');
const {_NAME} = redis;

test('echo-at-time: redis: create', (t) => {
    const createClient = stub();
    mockRequire('async-redis', {
        createClient,
    });
    
    const {create} = reRequire('./redis');
    
    const url = 'http://hello';
    create(url);
    
    t.ok(createClient.calledWith(url), 'should call createClient');
    t.end();
});

test('echo-at-time: redis: add', async (t) => {
    const hmset = stub();
    const hgetall = stub().returns({
        time: 'world',
    });
    
    const client = {
        hmset,
        hgetall,
    };
    
    const add = redis.add(client);
    const time = new Date().toISOString();
    const message = 'hello world';
    
    await add(time, message);
    
    t.ok(hmset.calledWith(_NAME, time, message), 'should call hmset');
    t.end();
});

test('echo-at-time: redis: add: duplicate', async (t) => {
    const time = new Date().toISOString();
    const message = 'hello world';
    
    const hmset = stub();
    const hgetall = stub().returns({
        [time]: message,
    });
    const client = {
        hmset,
        hgetall,
    };
    
    const add = redis.add(client);
    
    await add(time, message);
    
    t.notOk(hmset.called, 'should not call hmset');
    t.end();
});

test('echo-at-time: redis: add', async (t) => {
    const hmset = stub();
    const hgetall = stub().returns({});
    const client = {
        hmset,
        hgetall,
    };
    
    const add = redis.add(client);
    const time = new Date().toISOString();
    const message = 'hello world';
    
    await add(time, message);
    
    t.ok(hmset.calledWith(_NAME, time, message), 'should call hmset');
    t.end();
});
test('echo-at-time: redis: add', async (t) => {
    const hmset = stub();
    const hgetall = stub().returns({});
    const client = {
        hmset,
        hgetall,
    };
    
    const add = redis.add(client);
    const time = new Date().toISOString();
    const message = 'hello world';
    
    await add(time, message);
    
    t.ok(hmset.calledWith(_NAME, time, message), 'should call hmset');
    t.end();
});

test('echo-at-time: redis: remove', async (t) => {
    const hdel = stub();
    const client = {
        hdel,
    };
    
    const remove = redis.remove(client);
    const time = new Date().toISOString();
    
    await remove(time);
    
    t.ok(hdel.calledWith(_NAME, time), 'should call hmset');
    t.end();
});

test('echo-at-time: redis: getAll', async (t) => {
    const hgetall = stub();
    const client = {
        hgetall,
    };
    
    await redis.getAll(client);
    
    t.ok(hgetall.calledWith(_NAME), 'should call hdel');
    t.end();
});


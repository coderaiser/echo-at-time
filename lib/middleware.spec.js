'use strict';

const test = require('supertape');
const serveOnce = require('serve-once');
const stub = require('@cloudcmd/stub');

const middleware = require('./middleware');

test('echo-at-time: middleware: get: bad request', async (t) => {
    const add = stub();
    const doEcho = stub();
    
    const {request} = serveOnce(middleware, {
        add,
        doEcho,
    });
    
    const {body} = await request.get('/');
    
    t.equal(body, 'bad request');
    t.end();
});

test('echo-at-time: middleware: post: bad request', async (t) => {
    const add = stub();
    const doEcho = stub();
    
    const {request} = serveOnce(middleware, {
        add,
        doEcho,
    });
    
    const {body} = await request.post('/');
    
    t.equal(body, 'bad request');
    t.end();
});

test('echo-at-time: middleware: post: bad body', async (t) => {
    const add = stub();
    const doEcho = stub();
    
    const {request} = serveOnce(middleware, {
        add,
        doEcho,
    });
    
    const {body} = await request.post('/echoAtTime');
    
    t.ok(body.includes('SyntaxError'), 'should include syntax error');
    t.end();
});

test('echo-at-time: middleware: post: body: no time', async (t) => {
    const add = stub();
    const doEcho = stub();
    
    const {request} = serveOnce(middleware, {
        add,
        doEcho,
    });
    
    const {body} = await request.post('/echoAtTime', {
        body: {
            message: 'hi',
        },
    });
    
    t.ok(body.includes('Error: no time!'), 'should include syntax error');
    t.end();
});

test('echo-at-time: middleware: post: body: invalid date', async (t) => {
    const add = stub();
    const doEcho = stub();
    
    const {request} = serveOnce(middleware, {
        add,
        doEcho,
    });
    
    const {body} = await request.post('/echoAtTime', {
        body: {
            time: 'xx',
        },
    });
    
    t.ok(body.includes('Error: Invalid Date'), 'should include syntax error');
    t.end();
});

test('echo-at-time: middleware: post: body: no message', async (t) => {
    const add = stub();
    const doEcho = stub();
    
    const {request} = serveOnce(middleware, {
        add,
        doEcho,
    });
    
    const {body} = await request.post('/echoAtTime', {
        body: {
            time: new Date().toISOString(),
        },
    });
    
    t.ok(body.includes('Error: no message!'), 'should include syntax error');
    t.end();
});

test('echo-at-time: middleware: post: body: ok', async (t) => {
    const add = stub();
    const doEcho = stub();
    
    const {request} = serveOnce(middleware, {
        add,
        doEcho,
    });
    
    const {body} = await request.post('/echoAtTime', {
        body: {
            time: new Date().toISOString(),
            message: 'hello',
        },
    });
    
    t.equal(body, 'ok');
    t.end();
});


'use strict';

const test = require('supertape');
const serveOnce = require('serve-once');

const catchHandler = require('./catch-handler');

test('echo-at-time: catch-handler: error', async (t) => {
    const middleware = () => {
        throw Error('hi');
    };
    
    const {request} = serveOnce(catchHandler, {
        middleware,
        runners: {},
    });
    
    const {body} = await request.get('/');
    
    t.ok(body.includes('Error: hi'));
    t.end();
});

test('echo-at-time: catch-handler: no error', async (t) => {
    const middleware = (runners, req, res) => res.end('ok');
    
    const {request} = serveOnce(catchHandler, {
        middleware,
        runners: {},
    });
    
    const {body} = await request.get('/');
    
    t.equal(body, 'ok');
    t.end();
});


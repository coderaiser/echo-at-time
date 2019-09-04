#!/usr/bin/env node

'use strict';

const {log} = console;

process.on('unhandledRejection', (error) => {
    log('unhandledRejection', error);
});


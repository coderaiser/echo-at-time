'use strict';

const {run} = require('madrun');

module.exports = {
    'start': () => `node bin/echo-at-time.js`,
    'test': () => `tape 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -x ${run('test')}`,
    'lint': () => `putout bin lib madrun.js`,
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => `nyc ${run('test')}`,
};


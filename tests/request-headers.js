'use strict';

var assert = require('assert');
var common = require('./includes/common.js');

var callback = [false, false];
var index = 0;

common.executeTests(function (err, res) {
	callback[index] = true;
	index++;
	assert.ifError(err);
	assert.deepEqual(res.code, 200);
	assert.deepEqual(res.headers['content-type'], 'text/plain');
	assert.deepEqual(res.headers.foo, 'bar');
	assert.deepEqual(res.buffer.toString(), 'foo');
}, {
	headers: {
		foo: 'bar',
	},
	bufferType: 'buffer',
	noSslVerifier: true
});

process.on('exit', function () {
	var i;
	for (i in callback) {
		if (callback.hasOwnProperty(i)) {
			assert.ok(callback[i]);
		}
	}
});

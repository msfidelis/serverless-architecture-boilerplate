'use strict';

const newrelic  = require('./newrelic');
const parser    = require('./parsers');

module.exports.send((response, context, callback, error = null) => {
    const str_response = parser.parseObjectToString(response);
    callback(error, str_response);
});
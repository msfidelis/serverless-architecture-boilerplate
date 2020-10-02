'use strict';

const response = require('../shared/lib/response');

module.exports.notFound = (event, context, callback) => {
  return response.json(callback, null, 404);
};

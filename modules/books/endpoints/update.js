'use strict';

const dynamo = require('../../../shared/lib/dynamo');

const DYNAMO_TABLE_BOOKS = process.env.DYNAMO_TABLE_BOOKS || 'books';

/**
 * Update Item with PUT request 
 * 
 * {
 *  "title" : "updated"
 * } 
 *
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.update = (event, context, callback) => {
    
    let body = event.body ? event.body : event;
    let data = JSON.parse(body);
    
    let key = {
        hashkey: event.pathParameters.hashkey
    };
    
    let params = {};
    
    if (data.title) {
      params.title = {
        Action: 'PUT',
        Value: data.title
      };
    }
    
    if (data.author) {
      params.author = {
        Action: 'PUT',
        Value: data.author
      };
    }
    
    if (data.price) {
      params.price = {
        Action: 'PUT',
        Value: body.price
      };
    }
    
    dynamo.updateItem(key, params, DYNAMO_TABLE_BOOKS).then(success => {
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(success.Attributes)
        };

        callback(null, response);    
        
    });

};
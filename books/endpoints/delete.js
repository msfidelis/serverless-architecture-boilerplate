'use strict';

const dynamo = require('../../lib/dynamo');

const DYNAMO_TABLE_BOOKS = process.env.DYNAMO_TABLE_BOOKS || 'books';

module.exports.delete = (event, context, callback) => {

    let key = {
        hashkey: event.pathParameters.hashkey
    };

    dynamo.removeRow(key, DYNAMO_TABLE_BOOKS)
        .then(success => {

            callback(null, {
                statusCode: 204,
                body: JSON.stringify(success)
            })

        }).catch(err => {

            callback(err, {
                statusCode: 500,
                body: JSON.stringify(err)
            });

        })

};
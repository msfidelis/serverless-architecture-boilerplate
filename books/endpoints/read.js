'use strict';

const dynamo = require('../../lib/dynamo');

const DYNAMO_TABLE_BOOKS = process.env.DYNAMO_TABLE_BOOKS || 'books';

module.exports.list = (event, context, callback) => {

    dynamo.scan({}, null, DYNAMO_TABLE_BOOKS)
        .then(books => {

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(books.Items)
            });

        }).catch(err => {

            callback(err, {
                statusCode: 500,
                body: JSON.stringify(err)
            });
        })

};

module.exports.detail = (event, context, callback) => {

    console.log(event.pathParameters)

    dynamo.scan({
        hashkey: event.pathParameters.hashkey
    }, null, DYNAMO_TABLE_BOOKS).then(book => {

        if (!book.Items) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    status: 404,
                    message: "Not Found"
                })
            })
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(book.Items)
            })
        }
    }).catch(err => {
        callback(err, JSON.stringify(err));
    })

};
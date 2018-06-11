'use strict';

const dynamo = require('../../../shared/lib/dynamo');

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

    const params = {
        FilterExpression: "#hashkey = :hashkey",
        ExpressionAttributeNames: {
            "#hashkey": "hashkey",
        },
        ExpressionAttributeValues: {
            ":hashkey": event.pathParameters.hashkey
        }
    };

    dynamo.scan(params, null, DYNAMO_TABLE_BOOKS)
        .then(book => {

            if (book.Items.length === 0) {
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
                    body: JSON.stringify(book.Items[0])
                })
            }
        }).catch(err => callback(err, JSON.stringify(err)));

};
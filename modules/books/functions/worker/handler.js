'use strict';

const dynamo = require('../../../../shared/lib/dynamo');
const sqs = require('../../../../shared/lib/sqs');

const DYNAMO_TABLE_BOOKS = process.env.DYNAMO_TABLE_BOOKS || 'books';

/**
 * This is a Worker example 
 * It's a simple POC to update DynamoDB itens based on hashkey value
 * stored on SQS Queue
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.worker = (event, context, callback) => {


    //Get records on SQS to update a DynamoDB Table
    setInterval(() => {

        sqs.consumeQueue(1).then(poll => {

            if (!poll.Messages) {
                return;
            } else {
                poll.Messages.forEach(message => {

                    let item = JSON.parse(message.Body);

                    //Update item on DynamoDB and remove from Queue
                    _updateRecord(item.hashkey).then(success => {
                        sqs.removeFromQueue(message);
                    }).catch(err => console.log(err));

                });
            }

        }).catch(err => console.log(err));

    }, 100)

};

/**
 * Update flag on DynamoDB Item
 * @param {*} hashkey 
 */
function _updateRecord(hashkey) {

    let key = {
        hashkey: hashkey
    };

    let expression = "set updated_by_worker = :flag";

    let values = {
        ":flag": 1
    };

    return dynamo.update(key, expression, values, DYNAMO_TABLE_BOOKS);
}
'use strict';

const AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require('bluebird'));

const endpoint = process.env.SQS_URL;
const _sqs = new AWS.SQS({
    region: process.env.REGION || 'us-east-1'
});

/**
 * SQS Abstraction Library
 * @Author: Matheus 'Raj' Fidelis <raj@superlogica.com>
 * @save() - Interface Method. - Save Item on SQS Queue;
 * @sendToQueue() - Save Item on SQS Queue;
 * @consumeQueue() - Consume Queue Messages;
 * @removeFromQueue() - Remove Message from Queue;
 */
const client = {

    /**
     * 
     */
    save: message => {
        let params = {
            MessageBody: JSON.stringify(message),
            QueueUrl: endpoint
        };

        return _sqs.sendMessage(params).promise()
    },
    /**
     * 
     */
    sendToQueue: message => {

        let params = {
            MessageBody: JSON.stringify(message),
            QueueUrl: endpoint
        };

        return _sqs.sendMessage(params).promise()
    },
    /**
     * 
     */
    consumeQueue: (numberOfMessages = 1) => {

        let params = {
            QueueUrl: endpoint,
            MaxNumberOfMessages: numberOfMessages
        };

        return _sqs.receiveMessage(params).promise();
    },
    /**
     * 
     */
    removeFromQueue: message => {

        let params = {
            QueueUrl: endpoint,
            ReceiptHandle: message.ReceiptHandle
        };

        return _sqs.deleteMessage(params).promise();

    }

}

module.exports = client;
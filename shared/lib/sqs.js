'use strict';

const AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require('bluebird'));

const endpoint = process.env.SQS_QUEUE_URL;
const _sqs = new AWS.SQS({region: process.env.REGION || 'us-east-1'});

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
     * Save new message into queue
     */
    save: (message, queue=endpoint) => {

        const params = {
            MessageBody: JSON.stringify(message),
            QueueUrl: queue
        };

        return _sqs.sendMessage(params).promise()
    },
    /**
     * Send message to queue
     */
    sendToQueue: (message, queue=endpoint) => {

        const params = {
            MessageBody: JSON.stringify(message),
            QueueUrl: queue
        };

        return _sqs.sendMessage(params).promise()
    },
    /**
     * Get messages from Queue
     */
    consumeQueue: (numberOfMessages = 1, queue=endpoint) => {

        const params = {
            QueueUrl: queue,
            MaxNumberOfMessages: numberOfMessages
        };

        return _sqs.receiveMessage(params).promise();
    },
    /**
     * Remove message from quue
     */
    removeFromQueue: (message, queue=endpoint) => {

        if (message !== false && message !== undefined) {

            const params = {
                QueueUrl: queue,
                ReceiptHandle: message.ReceiptHandle
            };
    
            return _sqs.deleteMessage(params).promise();
    
        }

    }
}

module.exports = client;

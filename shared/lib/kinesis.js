'use strict';

const AWS = require('aws-sdk');

const kinesis = new AWS.Kinesis({ region: process.env.REGION || 'sa-east-1' });
const stream = process.env.KINESIS_STREAM || 'testStream';

/**
 * Kinesis Abstraction Library 
 * @Author: Matheus 'Raj' Fidelis <raj@superlogica.com>
 * @save() - Save Item on Kinesis
 */
const client = {

    save: (data, partition = '001') => {

        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }

        const record = {
            Data: data,
            PartitionKey: partition,
            StreamName: stream
        };

        return kinesis.putRecord(record).promise();

    }

};

module.exports = client;
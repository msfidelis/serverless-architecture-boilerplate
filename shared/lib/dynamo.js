'use strict';

const AWS = require("aws-sdk");

const dev = {
    region: 'localhost',
    endpoint: "http://dynamo:8000",
    accessKeyId: 'MOCK_ACCESS_KEY_ID',
    secretAccessKey: 'MOCK_SECRET_ACCESS_KEY',
    convertEmptyValues: true
};

const prod = { region: process.env.REGION || 'us-east-1' };

const config = process.env.IS_OFFLINE ? dev : prod

AWS.config.update(config);
AWS.config.setPromisesDependency(require('bluebird'));

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const tableDynamo = process.env.DYNAMO_TABLE || '';

/**
 * DynamoDB Client Abstraction 
 * @Author: Matheus 'Raj' Fidelis <raj@superlogica.com>
 * 
 * @save() - Register Item on DynamoDB
 * @find() - Find Register by Key
 * @query() - Execute DynamoDB Query
 * @scan() - Execute DynamoDB Scan
 * @update() - Execute a DynamoDB Update
 * @removeRow() - Delete a single row using Key
 */
const client = {

    /**
     * Save an Item on DynamoDBs
     */
    save: (item, table = tableDynamo) => {

        const params = {
            TableName: table,
            Item: item
        };

        return dynamoClient.put(params).promise();
    },

    /**
     * Find by Key comparison
     */
    find: where => {

        const params = {
            TableName: tableDynamo,
            Key: where
        };

        return dynamoClient.get(params).promise();
    },

    /**
     * Execute a Raw Select Query on DynamoTable. 
     * You must inform the KeyConditionExpression 
     * and ExpressionAttributeNames
     */
    query: where => {
        where.TableName = tableDynamo;
        return dynamoClient.query(where).promise();
    },

    /**
     * Execute a DynamoDB Scan 
     * Eventually Consistent
     */
    scan: (params, limit, table = tableDynamo) => {
        params.TableName = table;
        return dynamoClient.scan(params).promise();
    },

    /**
     * Update Expression based on Key comparison
     */
    update: (key, expression, values, table = tableDynamo) => {

        const params = {
            TableName: table,
            Key: key,
            UpdateExpression: expression,
            ExpressionAttributeValues: values,
            ReturnValues: "UPDATED_NEW"
        };

        return dynamoClient.update(params).promise();
    },

    /**
     * Update item identified by Key
     */
    updateItem: (key, attributes, table = tableDynamo) => {
        
        const params = {
            TableName: table,
            Key: key,
            ReturnValues: "ALL_NEW",
            AttributeUpdates: attributes
        };

        return dynamoClient.update(params).promise();
    },

    /**
     * Remove a row from DynamoDB based on Key comparison
     */
    removeRow: (key, table = tableDynamo) => {

        const params = {
            TableName: table,
            Key: key,
            ReturnValues: "ALL_OLD"
        };

        return dynamoClient.delete(params).promise();
    }

}

module.exports = client;
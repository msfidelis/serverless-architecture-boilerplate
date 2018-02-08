'use strict';

const AWS = require('aws-sdk');

/**
 * AWS Lambda Adapter 
 * This necessary give promise support do AWS Lambda SDK 
 * and reduce code complexity on usage
 * @author Matheus Fidelis <raj@superlogica.com>
 */
class AWSLambdaAdapter {

    /**
     * AWSLambda Constructor
     */
    constructor() {
        this.lambda = new AWS.Lambda({
            region: process.env.REGION
        });
    };

    /**
     * Invoke Another Lambda Function
     * @param {*} lambdaName 
     * @param {*} payload 
     */
    invoke(lambdaName, event = {}) {
        return this.lambda.invoke({
            FunctionName: lambdaName,
            Payload: JSON.stringify(event, null, 2)
        }).promise();
    };

    /**
     * Invoke Lambda Function Async
     * @param {*} lambdaName 
     * @param {*} event 
     * @param {*} callback 
     */
    invokeAsync(lambdaName, event = {}, callback) {
        return this.lambda.invokeAsync({
            FunctionName: lambdaName,
            Payload: JSON.stringify(event, null, 2)
        }, callback);
    };

}

module.exports = new AWSLambdaAdapter();
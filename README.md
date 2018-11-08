![Logo](https://cdn-images-1.medium.com/max/1600/1*OezhU9lHTNCk6O6FCUL5fQ.png)


# Serverless Architecture Boilerplate [![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/msfidelis/serverless-architecture-boilerplate.svg?branch=master)](https://travis-ci.org/msfidelis/serverless-architecture-boilerplate)


## Structure 

```
.
├── modules (modules folder)
│   └── books (module / context)
│       ├── endpoints (API endpoints)
│       │   ├── create.js
│       │   ├── delete.js
│       │   ├── read.js
│       │   └── update.js
│       └── functions (workers / background functions)
│           └── worker
│               └── handler.js
├── package.json
├── serverless.yml (serverless config)
├── shared (shared components)
│   └── lib (shared libraries)
│       ├── dynamo.js
│       ├── kinesis.js
│       ├── lambda.js
│       ├── parsers.js
│       ├── sqs.js
│       └── uuid.js
└── test (tests folder)
    └── unit (unit tests folder)
        ├── modules (unit tests for modules)
        │   └── books
        └── shared (unit tests for shared components)
            └── lib (unit tests for libraries)
                ├── dynamo.test.js
                ├── kinesis.test.js
                ├── parsers.test.js
                ├── sqs.test.js
                └── uuid.test.js
```

## Functions

### HTTP Trigger Function (API Gateway)

```yml
functions:

  # API Endpoints
  books-register:
    handler: modules/books/endpoints/create.create #Path to function
    memorySize: 128 # Lambda Memory Limit
    timeout: 60 # Lambda Timeout
    events: 
      - http: # HTTP Trigger 
          path: services/books # API Endpoint
          method: post # HTTP Method

```

### Cloudwatch Events Functions (Cron)

[Lambda Schedule Docs](https://serverless.com/framework/docs/providers/aws/events/schedule/)

```yml
# Background Function
  books-consumer:
    handler: modules/books/functions/worker/handler.worker #Path to function
    events:
      - schedule: #Cloudwatch Event Trigger
        rate: cron(* * * * * *) # Cron Syntax 
        enabled: true # Trigger Enabled

```

## Development environment 

This boilerplate uses `serverless-local` plugin and some containers and plugins to emulate the AWS Resources

```bash
docker-compose up
```
The applications will start on `http://localhost:3000`

### Dev Plugins

This boilerplate contains following plugins for local development: 

* [serverless-offline](https://github.com/dherault/serverless-offline/issues) - For run API Gateway local and manage plugins 
* [serverless-offline-scheduler](https://github.com/ajmath/serverless-offline-scheduler) - CloudWatch Schedule Adapter
* [serverless-offline-sqs-esmq](https://github.com/msfidelis/serverless-offline-sqs-esmq) - SQS Adapter
* [serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local/releases) - DynamoDB Adapter


## Production environment

### Deploy full services

```bash
serverless deploy -v
```

[![asciicast](https://asciinema.org/a/4mzSihwWksZvjx7KO6mUy3EmO.png)](https://asciinema.org/a/4mzSihwWksZvjx7KO6mUy3EmO)


### Deploy a function 

```bash
serverless deploy function -f books-consumer
```

### Get function logs

```bash
serverless books-consumer -f bananinha -t
```

### Clean All

```bash
serverless remove
```

## Testing

**Create Book**

```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"title": "American Gods", "author": "Neil Gaiman", "price": 10.00  }' \
    https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books -i
```

**List Books**


```bash
curl -X GET \
    https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books
```

[![asciicast](https://asciinema.org/a/OAT6cNHhPhfZdgYBSB0sNFN5Q.png)](https://asciinema.org/a/OAT6cNHhPhfZdgYBSB0sNFN5Q)


**Detail Book**

```bash
curl -X GET \
    https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books/456c9e8f-6c50-d656-dc69-dc828c42af65
```

**Delete Book** 

```bash
curl -X DELETE \
    https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books/456c9e8f-6c50-d656-dc69-dc828c42af65 -i 
```

**Update Book**

```bash
curl -X PUT \
    -d '{"title": "updated modafoca"}' -H "Content-type: application/json" \
    https://eusrv4mci5.execute-api.us-east-1.amazonaws.com/production/services/books/bbafdb0c-ee6e-fca0-f224-ed534f5b7766 -i
```

[![asciicast](https://asciinema.org/a/2AbL3Gefn565F2WYJN9f50RlP.png)](https://asciinema.org/a/2AbL3Gefn565F2WYJN9f50RlP)


## Custom and Environment Variables

### Custom Items

> Creating and Using custom variables to build dynamic name

```yml
custom:
  region: ${self:provider.region} 
  stage: ${opt:stage, self:provider.stage}
  prefix: ${self:custom.stage}-${self:service}
  process: ${self:custom.prefix}-process
  config: ${self:custom.prefix}-config
  dynamo-books: ${self:custom.prefix}-BooksCatalog
  sns-logs: ${self:custom.prefix}-trigger-logs 
  sqs-logs: ${self:custom.prefix}-messages-logs
```

### Environment Variables

> Building URL Resources using CloudFormation parameters and Custom Variables 

```yml
  environment: # Global Environment variables
    DYNAMO_TABLE_BOOKS: ${self:custom.dynamo-books} # Reference to Custom Env
    SQS_QUEUE_URL: 'https://sqs.${self:provider.region}.amazonaws.com/#{AWS::AccountId}/${self:custom.sqs-logs}'
    REGION: ${self:custom.region}
```



## Manage AWS Cloudformation with Serverless

### IAM Roles

[IAM Docs](https://serverless.com/framework/docs/providers/aws/guide/iam/)

```yml
  iamRoleStatements: # Permissions for all of your functions can be set here

  - Effect: Allow
    Action: # Gives permission to DynamoDB tables in a specific region
      - dynamodb:DescribeTable
      - dynamodb:Query
      - dynamodb:Scan
      - dynamodb:GetItem
      - dynamodb:PutItem
      - dynamodb:UpdateItem
      - dynamodb:DeleteItem
    Resource: "arn:aws:dynamodb:us-east-1:*:*"

  - Effect: Allow
    Action: # Gives permission to Lambda execution
      - lambda:InvokeFunction
      - lambda:InvokeAsync
    Resource: "*"
```

### Manage Infrastructure Components - [Docs](https://serverless.com/framework/docs/providers/aws/guide/resources/#aws-cloudformation-resource-reference)

```yml
# Infrastrucure - Cloud Formation
resources:  # CloudFormation template syntax

  Resources:
    #DynamoDB Books Table
    BooksCatalog:
      Type: AWS::DynamoDB::Table # CloudFormation Pseudo Parameter Example
      Properties:
        TableName: ${self:custom.dynamo-books}
        AttributeDefinitions:
          - AttributeName: hashkey
            AttributeType: S
        KeySchema:
          - AttributeName: hashkey
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 2
          WriteCapacityUnits: 1

    # SQS Queue to Update DynamoDB
    BooksQueueExample:
      Type: AWS::SQS::Queue
      Properties:
        QueueName: ${self:custom.sqs-logs}
        MessageRetentionPeriod: 1209600
        VisibilityTimeout: 60
```

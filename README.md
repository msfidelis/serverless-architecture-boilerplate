
## Under Construction

## Structure 

```
├── books (module / context)
│   ├── endpoints (API Gateway Endpoints)
│   │   ├── create.js (endpoint)
│   │   ├── delete.js (endpoint)
│   │   ├── read.js (endpoint)
│   │   └── update.js (endpoint)
│   └── functions (Background Functions)
│       └── worker (function / context)
│           └── handler.js (function)
|
├── lib (shared libraries)
│   ├── dynamo.js
│   ├── kinesis.js
│   ├── lambda.js
│   ├── sqs.js
│   └── uuid.js
|
├── node_modules (shared node_modules)
├── package.json
└── serverless.yml
```

### Deploy full services

```bash
serverless deploy -v
```

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

Create Book

```bash
curl -H "Content-Type: application/json" -d '{"title": "American Gods", "author": "Neil Gaiman", "price": 10.00  }' https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books -i
```

List Books


```bash
curl -X GET https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books
```

Detail Book 

```bash
curl -X GET https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books/456c9e8f-6c50-d656-dc69-dc828c42af65
```

Delete Book 

```bash
curl -X DELETE https://yur25zhqo0.execute-api.us-east-1.amazonaws.com/production/services/books/456c9e8f-6c50-d656-dc69-dc828c42af65 -i 
```

Update Book

```bash

```
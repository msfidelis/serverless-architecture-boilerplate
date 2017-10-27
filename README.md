
# Serverless Architecture Boilerplate [![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## Under Construction

## Structure 

```
├── README.md
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
└── shared (shared components)
    └── lib (shared libraries)
        ├── dynamo.js
        ├── kinesis.js
        ├── lambda.js
        ├── sqs.js
        └── uuid.js
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

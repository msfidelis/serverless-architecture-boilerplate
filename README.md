
## Under Construction


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
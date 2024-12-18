# BookSearchApiClient

API client which makes request to book seller API to retrieve a list of books. Is able to get books by **Author**, **Publisher**, **ISBN** and **Year**. Client contains specific function for getting books by Author and Publisher as well as generic **GetBook** function which allows you specify what query to be used

Book list contains the following information :

```
title
author
isbn
quantity
price
```

# Prerequisites

- NVM (https://github.com/nvm-sh/nvm)
- Node (https://nodejs.org/en/download/package-manager)

# Local setup

- Ensure all prerequisites are installed
- Run `nvm use`
- Run `npm i`

# Testing

Unit tests have been added using jest and can be run by calling

`npm run test`

# Javascript Code Test

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstrate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How would you manage differences in response payloads between different APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested

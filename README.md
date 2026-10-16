# Average API

A REST API built with Node.js and Express that calculates the running average of all valid numbers submitted to the server.

## Features

- `POST /average` endpoint to submit numbers.
- Calculates the running average across requests.
- Validates input and rejects invalid numbers with HTTP 400.
- Automated tests using the built-in Node.js test runner.
- JSDoc documentation.
- Husky Git hooks and Commitlint enforcement for Conventional Commits.

## Requirements

- Node.js and npm
- Git
- Postman (optional, for manual API testing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/msjhenkar/average-api.git
   cd average-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Run the Server

```bash
npm start
```

The API runs at `http://localhost:3000`.

## API Reference

### POST `/average`

Accepts a JSON request containing a number and returns the running average.

**Request body:**

```json
{
  "number": 10
}
```

**Successful response — HTTP 200 OK:**

```json
{
  "average": 10,
  "count": 1
}
```

Each valid request updates the running total and count. The response contains the average of all valid numbers received since the server started.

**Invalid request example:**

```json
{
  "number": "hello"
}
```

Returns HTTP `400 Bad Request` with an error message.

## Testing with Postman

You can use [Postman](https://www.postman.com/downloads/) to test the API manually.

### 1. Start the server

```bash
npm start
```

### 2. Configure the request

- **Method:** `POST`
- **URL:** `http://localhost:3000/average`
- Select **Body → raw → JSON**.

Enter this request body:

```json
{
  "number": 10
}
```

Click **Send**.

**Expected response — HTTP 200 OK:**

```json
{
  "average": 10,
  "count": 1
}
```

### 3. Test the running average

Send another request with this body:

```json
{
  "number": 20
}
```

Expected response:

```json
{
  "average": 15,
  "count": 2
}
```

### 4. Test invalid input

Send this request body:

```json
{
  "number": "hello"
}
```

Expected result: HTTP `400 Bad Request`, with an error message.

**Note:** The running average is stored in memory and resets when the server restarts. Start with a fresh server when reproducing the examples above.

## Run Automated Tests

Run the test suite with:

```bash
npm test
```

The automated tests cover running-average calculation and invalid input handling.

## Git Hooks and Conventional Commits

Husky runs Git hooks, including tests before commits. Commitlint validates commit messages using the Conventional Commits format.

Examples of valid commit messages:

- `feat: add average endpoint`
- `test: add API tests`
- `docs: add README`

Invalid commit messages are rejected by the commit-message hook.

## Design Notes

- Numbers are stored in memory, so the running average resets when the server restarts.
- A database is not required for this assignment because persistent storage is outside the specified requirements.

## License

This project was created as part of a software development internship coding assignment.

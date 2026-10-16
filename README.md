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

## Run the server

```bash
npm start
```

The API will run at `http://localhost:3000`.

## API Reference

### POST `/average`

Accepts a JSON request containing a number.

**Request body:**

```json
{
  "number": 10
}
```

**Successful response — HTTP 200:**

```json
{
  "average": 10,
  "count": 1
}
```

Each valid request updates the running total and count. The response returns the average of all valid numbers received since the server started.

**Invalid request:**

```json
{
  "number": "hello"
}
```

Returns HTTP 400 with an error message.

### Example client requests

With the server running, open another terminal and run:

```bash
curl.exe -X POST "http://localhost:3000/average" -H "Content-Type: application/json" --data-binary '{\"number\":10}'
```

Then submit another number:

```bash
curl.exe -X POST "http://localhost:3000/average" -H "Content-Type: application/json" --data-binary '{\"number\":20}'
```

The second response should be:

```json
{
  "average": 15,
  "count": 2
}
```

## Run tests

```bash
npm test
```

The automated tests cover running-average calculation and invalid input handling.

## Git Hooks and Conventional Commits

Husky runs Git hooks, and Commitlint validates commit messages using the Conventional Commits format.

Examples:

- `feat: add average endpoint`
- `test: add API tests`
- `docs: add README`

Invalid commit messages are rejected by the commit-message hook.

## Design Notes

- Numbers are stored in memory, so the running average resets when the server restarts.
- The API does not use a database because persistent storage is not required for this assignment.

## License

This project was created as part of a software development internship coding assignment.

const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('node:http');
const app = require('../src/app');

/**
 * Starts an HTTP server on an available local port for testing.
 * @returns {Promise<import('node:http').Server>} The test server.
 */
function startTestServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => resolve(server));
  });
}

/**
 * Sends a JSON POST request to the test server.
 * @param {number} port - The server port.
 * @param {object} body - The request body.
 * @returns {Promise<{status: number, data: object}>} The HTTP status and response.
 */
function postAverage(port, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);

    const req = request.request(
      {
        hostname: '127.0.0.1',
        port,
        path: '/average',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
          });
        });
      },
    );

    req.on('error', reject);
    req.end(payload);
  });
}

test('POST /average calculates the running average', async () => {
  const server = await startTestServer();
  const { port } = server.address();

  try {
    assert.deepEqual(await postAverage(port, { number: 10 }), {
      status: 200,
      data: { average: 10, count: 1 },
    });

    assert.deepEqual(await postAverage(port, { number: 20 }), {
      status: 200,
      data: { average: 15, count: 2 },
    });

    assert.deepEqual(await postAverage(port, { number: 30 }), {
      status: 200,
      data: { average: 20, count: 3 },
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('POST /average rejects invalid input', async () => {
  const server = await startTestServer();
  const { port } = server.address();

  try {
    const result = await postAverage(port, { number: 'hello' });

    assert.equal(result.status, 400);
    assert.equal(typeof result.data.error, 'string');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

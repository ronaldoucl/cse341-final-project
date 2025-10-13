const request = require('supertest');
const app = require('../server');
const db = require('../data/database');

/**
 * Functional tests for GET endpoints using Jest and Supertest.
 * These tests verify that the API returns expected status codes and formats.
 * The database connection is initialized before all tests and safely closed after.
 */

beforeAll((done) => {
  db.initDb((err) => {
    if (err) return done(err);
    done();
  });
});

afterAll(async () => {
  const database = db.getDb();
  if (database && database.client) {
    await database.client.close();
  }
});

describe('GET Endpoints', () => {
  it('GET /series should return 200 and an array', async () => {
    const res = await request(app).get('/series');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /series/:id should return 200 or 404', async () => {
    const id = '000000000000000000000000';
    const res = await request(app).get(`/series/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('GET /movies should return 200 and an array', async () => {
    const res = await request(app).get('/movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /movies/:id should return 200 or 404', async () => {
    const id = '000000000000000000000000';
    const res = await request(app).get(`/movies/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('GET /users should return 200 and an array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /users/:id should return 200 or 404', async () => {
    const id = '000000000000000000000000';
    const res = await request(app).get(`/users/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('GET /customers should return 200 and an array', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /customers/:id should return 200 or 404', async () => {
    const id = '000000000000000000000000';
    const res = await request(app).get(`/customers/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});

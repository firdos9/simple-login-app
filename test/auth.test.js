const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  // Test: server requires both fields and returns 400 with the same message
  test('requires username & password', async () => {
    const res = await request(app).post('/api/login').send({});
    expect(res.status).toBe(400);
    // check the message contains the expected text (case-insensitive)
    expect(res.body.message).toMatch(/Please enter both/i);
  });

  // Test: wrong username/password should return 401 and the generic message
  test('rejects invalid credentials', async () => {
    const res = await request(app).post('/api/login').send({ username: 'admin', password: 'wrong' });
    expect(res.status).toBe(401);
    // Updated assertion: server now returns a generic message
    // "username or password is incorrect"
    expect(res.body.message).toMatch(/username or password is incorrect/i);
  });

  // Test: correct credentials accepted (200 + ok: true + success message)
  test('accepts correct credentials', async () => {
    const res = await request(app).post('/api/login').send({ username: 'admin', password: '1234' });

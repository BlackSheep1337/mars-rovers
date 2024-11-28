import request from 'supertest';
import app from '../../../src/app';

describe('Login Endpoint', () => {
  const email = `testuser_${Date.now()}@example.com`;
  const password = process.env.TEST_PASSWORD || 'SecureP@ssw0rd';

  beforeAll(async () => {
    await request(app).post('/api/rovers/register').send({ email, password });
  });

  test('should login successfully', async () => {
    const response = await request(app).post('/api/rovers/login').send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should fail with invalid credentials', async () => {
    const response = await request(app).post('/api/rovers/login').send({ email, password: 'wrongPassword' });

    const { body } = response;

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });
});

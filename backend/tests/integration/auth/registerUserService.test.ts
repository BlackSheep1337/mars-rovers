import request from 'supertest';
import app from '../../../src/app';

describe('Register Endpoint', () => {
  test('should register a new user', async () => {
    const email = `testuser_${Date.now()}@example.com`;
    const response = await request(app).post('/api/rovers/register').send({
      email,
      password: process.env.TEST_PASSWORD || 'SecureP@ssw0rd',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('should fail if email is already in use', async () => {
    const email = `testuser_${Date.now()}@example.com`;

    await request(app).post('/api/rovers/register').send({ email, password: process.env.TEST_PASSWORD || 'SecureP@ssw0rd' });

    const response = await request(app).post('/api/rovers/register').send({ email, password: 'AnotherPassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already in use');
  });
});

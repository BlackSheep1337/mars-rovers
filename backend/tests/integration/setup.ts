import request from 'supertest';
import app from '../../src/app';

export const createUserAndLogin = async (): Promise<string> => {
  const email = `testuser_${Date.now()}@example.com`;
  const password = process.env.TEST_PASSWORD || 'SecureP@ssw0rd';

  await request(app).post('/api/rovers/register').send({ email, password });

  const response = await request(app).post('/api/rovers/login').send({ email, password });
  return response.body.token;
};

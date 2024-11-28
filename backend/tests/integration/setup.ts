import request from 'supertest';
import app from '../../src/app';

export const createUserAndLogin = async (): Promise<string> => {
  const email = `testuser_${Date.now()}@example.com`;
  const password = process.env.TEST_PASSWORD || 'SecureP@ssw0rd';

  await request(app).delete(`/api/rovers/deleteUser`).send({ email });

  const registerResponse = await request(app).post('/api/rovers/register').send({ email, password });

  if (registerResponse.status !== 201) {
    console.error('Failed to register user:', registerResponse.body);
    throw new Error('User registration failed');
  }

  const loginResponse = await request(app).post('/api/rovers/login').send({ email, password });

  if (loginResponse.status !== 200) {
    console.error('Failed to log in:', loginResponse.body);
    throw new Error('Login failed');
  }

  const { token } = loginResponse.body;

  if (!token) {
    console.error('Token not received:', loginResponse.body);
    throw new Error('Token was not generated');
  }

  return token;
};

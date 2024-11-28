import request from 'supertest';
import app from '../../../src/app';
import { createUserAndLogin } from '../setup';

describe('Get Rover History Endpoint', () => {
  let authToken: string;

  beforeAll(async () => {
    authToken = await createUserAndLogin();
  });

  test('should get rover history', async () => {
    const response = await request(app).get('/api/rovers/history').set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined()
    expect(Array.isArray(response.body.history)).toBe(true);
  });
});
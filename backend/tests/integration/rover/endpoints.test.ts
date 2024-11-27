import request from 'supertest';
import app from '../../../src/app';

describe('Rover Endpoints - Smoke Tests', () => {
  test('should return 404 for invalid route', async () => {
    const response = await request(app).get('/invalid/route');
    expect(response.status).toBe(404);
  });
});

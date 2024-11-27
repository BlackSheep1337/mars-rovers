import request from 'supertest';
import app from '../../../src/app';
import { createUserAndLogin } from '../setup';

describe('Process Rover Commands Endpoint', () => {
  let authToken: string;

  beforeAll(async () => {
    authToken = await createUserAndLogin();
  });

  test('should process rover commands and return position', async () => {
    const response = await request(app)
      .post('/api/rovers/commands')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        position: { x: 0, y: 0, direction: 'N' },
        commands: 'MRML',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('position');
    expect(response.body.position).toMatchObject({
      x: expect.any(Number),
      y: expect.any(Number),
      direction: expect.any(String),
    });
  });
});

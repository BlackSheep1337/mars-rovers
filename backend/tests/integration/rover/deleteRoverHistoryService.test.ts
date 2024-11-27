import request from 'supertest';
import app from '../../../src/app';
import { createUserAndLogin } from '../setup';

describe('Delete Rover History Endpoint', () => {
  let authToken: string;

  beforeAll(async () => {
    authToken = await createUserAndLogin();

    await request(app)
      .post('/api/rovers/commands')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        position: { x: 1, y: 1, direction: 'E' },
        commands: 'MRM',
      });
  });

  test('should delete rover history', async () => {
    const response = await request(app).delete('/api/rovers/history/delete').set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('History deleted');
  });
});

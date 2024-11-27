import request from 'supertest'; 
import app from '../../src/app'; 

describe('Rover Endpoints', () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'password' });

    authToken = response.body.token;
  });

  test('should get rover history', async () => {
    const response = await request(app)
      .get('/api/rovers/history')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test('should process rover commands', async () => {
    const response = await request(app)
      .post('/api/rovers/commands')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ commands: 'MOVE FORWARD' }); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('position');
  });

  test('should delete rover history', async () => {
    const response = await request(app)
      .delete('/api/rovers/history/delete')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('History deleted');
  });
});

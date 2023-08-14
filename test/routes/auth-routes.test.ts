import supertest from 'supertest';
import server from '../../src/server';

describe('login-routes', () => {
  it('should return a 401 error if username or password is incorrect', async () => {
    const api = supertest(server);

    const response = await api.post('/api/register').send({
      username: 'chiranjeev',
      password: 'password12',
      email: 'chiranjeev124@gmail.com',
      repeat_password: 'password12',
    });

    console.log(response.body);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid username or password' });
  });
});

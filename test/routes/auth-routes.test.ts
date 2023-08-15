import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../src/app';
import { connectToDb } from '../../src/db';
import UserModel from '../../src/models/UserModel';
import authHelper from './authHelper';

describe('login-routes', () => {
  const api = supertest(app);
  beforeAll(async () => {
    await connectToDb();
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });
  it('refresh_token and access_token is present for a successful api request', async () => {
    //[+] Expect proper http status and response format
    const response = await api
      .post('/api/register')
      .send(authHelper.user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    //[+]Expect access token and refresh token to be present

    expect(response.body.access_token).toBeDefined();
    expect(response.body.refresh_token).toBeDefined();
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});

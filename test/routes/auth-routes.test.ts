import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../src/app';
import { connectToDb } from '../../src/db';
import UserModel from '../../src/models/UserModel';
import authHelper from './authHelper';

describe('login-routes', () => {
  const BASE_URL = '/api/register';
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
      .post(BASE_URL)
      .send(authHelper.user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    //[+]Expect access token and refresh token to be present

    expect(response.body.access_token).toBeDefined();
    expect(response.body.refresh_token).toBeDefined();
  });

  it('will give error if the `password` and `repeat_password` do not match', async () => {
    const response = await api
      .post(BASE_URL)
      .send({
        ...authHelper.user,
        repeat_password: '12345hellothere',
      })
      .expect(422);

    //[+]Expect the proper zod invalidation message
    expect(response.body.message).toBe(
      "repeat_password  : Passwords don't match"
    );
  });

  it('will throw error if user with same email already exists', async () => {
    await UserModel.insertMany([authHelper.user]);

    //[+] Expect proper custom error
    await api
      .post(BASE_URL)
      .send(authHelper.user)
      .expect(409)
      .expect('Content-Type', /application\/json/)
      .then((res) => {
        expect(res.body).toEqual({ message: 'This email is already taken' });
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});

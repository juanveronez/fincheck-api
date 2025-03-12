import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture
      .createNestApplication()
      .useGlobalPipes(new ValidationPipe());

    await app.init();

    request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'juan@veronez.com',
        password: 'abcd1234',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
        accessToken = res.body.accessToken;
      });
  });

  describe('/users/me (GET)', () => {
    const baseRequest = () =>
      request(app.getHttpServer())
        .get('/users/me')
        .auth(accessToken, { type: 'bearer' });

    it('With valid data', async () => {
      return await baseRequest()
        .send()
        .expect(200)
        .expect({ userId: 'userId' });
    });
  });
});

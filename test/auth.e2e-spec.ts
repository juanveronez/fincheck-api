import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { verify } from 'jsonwebtoken';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture
      .createNestApplication()
      .useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/auth/signin (POST)', () => {
    const baseRequest = () => request(app.getHttpServer()).post('/auth/signin');

    it('With valid data', async () => {
      return baseRequest()
        .send({
          email: 'juan@veronez.com',
          password: 'abcd1234',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');

          const isValid = verify(res.body.accessToken, process.env.JWT_SECRET);
          expect(isValid).toBeTruthy();
        });
    });

    it('With not existent `email`', async () => {
      return baseRequest()
        .send({
          email: 'juan+1@veronez.com',
          password: 'abcd1234',
        })
        .expect(401)
        .expect({
          message: 'Invalid credentials.',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('With invalid `password`', async () => {
      return baseRequest()
        .send({
          email: 'juan@veronez.com',
          password: '1234abcd',
        })
        .expect(401)
        .expect({
          message: 'Invalid credentials.',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('Without `email`', () => {
      return baseRequest()
        .send({
          password: 'abcd1234',
        })
        .expect(400)
        .expect({
          message: [
            'email must be an email',
            'email should not be empty',
            'email must be a string',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Without `password`', () => {
      return baseRequest()
        .send({
          email: 'juan@veronez.com',
        })
        .expect(400)
        .expect({
          message: [
            'password must be longer than or equal to 8 characters',
            'password should not be empty',
            'password must be a string',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('With bad format `email`', () => {
      return baseRequest()
        .send({
          email: 'juanveronez',
          password: 'abcd1234',
        })
        .expect(400)
        .expect({
          message: ['email must be an email'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('With `password` length lower then expected', () => {
      return baseRequest()
        .send({
          email: 'juan@veronez.com',
          password: 'abcd12',
        })
        .expect(400)
        .expect({
          message: ['password must be longer than or equal to 8 characters'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});

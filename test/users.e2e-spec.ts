import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { compare } from 'bcryptjs';
import { isUUID } from 'class-validator';

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

  describe('/users (POST)', () => {
    it('With valid data', async () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Juan Veronez',
          email: 'juan@veronez.com',
          password: 'abcd1234',
        })
        .expect(201)
        .expect(async (res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('password');

          expect(res.body.name).toMatch('Juan Veronez');
          expect(res.body.email).toMatch('juan@veronez.com');

          expect(isUUID(res.body.id)).toBeTruthy();
          expect(await compare('abcd1234', res.body.password)).toBeTruthy();
        });
    });

    it('Without `name`', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'juan@veronez.com',
          password: 'abcd1234',
        })
        .expect(400)
        .expect({
          message: ['name should not be empty', 'name must be a string'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Without `email`', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Juan Veronez',
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
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Juan Veronez',
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
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Juan Veronez',
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
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Juan Veronez',
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

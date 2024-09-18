import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';


describe('AppController (e2e)', () => {

  describe('App e2e', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile()
      app = moduleRef.createNestApplication()
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
      await app.init()
      await app.listen(3334)

      prisma = app.get(PrismaService)
      await prisma.clearDb
      pactum.request.setBaseUrl('http://localhost:3334')
    })
    afterAll(() => {
      app.close()
    })
    it.todo('should pass')

    describe('Auth', () => {
      const dto: AuthDto = {
        email: 'vld@gmail.com',
        password: '123'
      }

      describe('Signup', () => {
        it('should throw if email empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({ password: dto.password })
            .expectStatus(400)
            .inspect()
        })
        it('should throw if password empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({ email: dto.email })
            .expectStatus(400)
            .inspect()
        })
        it('should throw if no body provided', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .expectStatus(400)
            .inspect()
        })
        it('should signup', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody(dto)
            .expectStatus(200)
            .inspect()
        })
      })

      describe('Signin', () => {
        let accessToken: string
        pactum.handler.addCaptureHandler('first post id', (ctx) => {
          return ctx.res.body.access_token;
        });
        pactum.handler.addCaptureHandler('get token', (ctx) => {
          // console.log('res', ctx.res.body.access_token);
          console.log('ctx.store', ctx.store);

          return ctx.store;
        });
        it('should throw if email empty', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({ password: dto.password })
            .expectStatus(400)
            .inspect()
        })
        it('should throw if password empty', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({ email: dto.email })
            .expectStatus(400)
            .inspect()
        })
        it('should throw if no body provided', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .expectStatus(400)
            .inspect()
        })
        it('should signin', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody(dto)
            .expectStatus(200)
            // .stores('userAt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidmxkQGdtYWlsLmNvbSIsImlhdCI6MTcyNjQ4MjE5MiwiZXhwIjoxNzI2NDgzMDkyfQ.bB_vQ3DKxrnI0dcrsDKGiGhFhQIdkjwvXuMepFmoFuw')
            .stores('userAt', '#first post id')
            .inspect()
        })
      })
    })

    describe('User', () => {
      let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidmxkQGdtYWlsLmNvbSIsImlhdCI6MTcyNjY1ODYwNSwiZXhwIjoxNzI2NjU5NTA1fQ.PeQgT4E7gmpmGi7GaIYKtVdg5Hj6y7UP4D9h3dSFN_A'

      describe('Get me', () => {
        it('should get current user', () => {

          return pactum
            .spec()
            .get('/users/me')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            // .withBearerToken('userAt')
            .expectStatus(200)
            .inspect()
        })
      })

      describe('Edit user', () => {
        it('should edit user', () => {
          const dto: EditUserDto = {
            firstName: 'Test',
            email: 'test@gmail.com'
          }
          return pactum
            .spec()
            .patch('/users/edit')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .withBody(dto)
            .expectStatus(200)
            .inspect()
        })
      })

    })

    describe('Bookmarks', () => {
      let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidmxkQGdtYWlsLmNvbSIsImlhdCI6MTcyNjY1ODYwNSwiZXhwIjoxNzI2NjU5NTA1fQ.PeQgT4E7gmpmGi7GaIYKtVdg5Hj6y7UP4D9h3dSFN_A'

      describe('Get empty bookmark', () => {
        it('should get bookmark', () => {

          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .expectStatus(200)
            .inspect()
        })
      })
      describe('Create bookmark', () => { })
      describe('Get bookmarks', () => { })
      describe('Get bookmar by id', () => { })
      describe('Edit bookmar', () => { })
      describe('Delete bookmar', () => { })

    })
  })

});

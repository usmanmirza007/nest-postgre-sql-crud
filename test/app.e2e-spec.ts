import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';


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

    let accessToken: string
    pactum.handler.addCaptureHandler('get token', (ctx) => {
      accessToken = ctx.res.body.access_token
      return ctx.res.body.access_token;
    });

    let bookmarkId: string
    pactum.handler.addCaptureHandler('get bookmark id', (ctx) => {
      bookmarkId = ctx.res.body?.id
      return ctx.res.body?.id
    });
    describe('Auth', () => {

      const dto: AuthDto = {
        email: 'test123@gmail.com',
        password: '123'
      }

      describe('Signup', () => {
    
        it('should throw if email empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({ password: dto.password })
            .expectStatus(400)
          // .inspect()
        })
        it('should throw if password empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({ email: dto.email })
            .expectStatus(400)
          // .inspect()
        })
        it('should throw if no body provided', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .expectStatus(400)
          // .inspect()
        })
        it('should throw email already taken', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody(dto)
            .expectStatus(409)
          // .inspect()
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

        it('should throw if email empty', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({ password: dto.password })
            .expectStatus(400)
          // .inspect()
        })
        it('should throw if password empty', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({ email: dto.email })
            .expectStatus(400)
          // .inspect()
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
            .stores('userAt', '#get token')
            .inspect()
        })
      })
    })

    describe('User', () => {

      describe('Get me', () => {
        it('should get current user', () => {

          return pactum
            .spec()
            .get('/users/me')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .expectStatus(200)
          // .inspect()
        })

        it('should get unauthorization token', () => {

          return pactum
            .spec()
            .get('/users/me')
            // .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .expectStatus(401)
          // .inspect()
        })
      })

      describe('Edit user', () => {
        it('should edit user', () => {
          const dto: EditUserDto = {
            firstName: 'Test',
            lastName: 'name'
          }
          return pactum
            .spec()
            .patch('/users/edit')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .withBody(dto)
            .expectStatus(200)
          // .inspect()
        })

        it('should email taken', () => {
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
            .expectStatus(409)
          // .inspect()
        })
      })

    })

    describe('Bookmarks', () => {

      describe('Get empty bookmark', () => {
        it('should get bookmark', () => {

          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .expectStatus(200)
          // .inspect()
        })
      })

      describe('Create bookmark', () => {
        it('should create bookmark', () => {
          const dto: CreateBookmarkDto = {
            title: 'test',
            description: 'test',
            link: 'resefr'
          }
          return pactum
            .spec()
            .post('/bookmarks')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .withBody(dto)
            .expectStatus(201)
            .stores('bookmarkId', '#get bookmark id')
            .inspect()
        })
      })

      describe('Get bookmarks', () => {
        it('should get bookmark', () => {

          return pactum
            .spec()
            .get(`/bookmarks/${bookmarkId}`)
            .withPathParams('id', `${bookmarkId}`)
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .expectStatus(200)
            .inspect()
        })
      })

      describe('Get bookmar by id', () => {
        it('should get bookmark', () => {

          return pactum
            .spec()
            .get(`/bookmarks/${bookmarkId}`)
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .expectStatus(200)
            .inspect()
        })
      })

      describe('Edit bookmar', () => {
        it('should edit bookmark', () => {
          const dto: EditBookmarkDto = {
            title: 'test',
            description: 'test',
            link: 'resefr'
          }
          return pactum
            .spec()
            .patch(`/bookmarks/${bookmarkId}`)
            .withPathParams('id', '${bookmarkId}')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .withBody(dto)
            .expectStatus(200)
            .inspect()
        })
      })

      describe('Delete bookmar', () => {

        it('should delete bookmark', () => {

          return pactum
            .spec()
            .delete(`/bookmarks/${bookmarkId}`)
            .withPathParams('id', '${bookmarkId}')
            .withHeaders('Authorization', `Bearer ${accessToken}`)
            .withHeaders('Accept', 'application/json')
            .expectStatus(200)
          // .inspect()
        })
      })

    })
  })

});

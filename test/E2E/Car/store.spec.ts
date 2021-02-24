import 'start/env'
import * as bcrypt from 'bcrypt'
import * as request from 'supertest'

import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { UserRepository } from 'app/Repositories/UserRepository'
import { Token } from '@secjs/core/build/Utils/Classes/Token'

describe('\n[E2E] Store Cars 🏘', () => {
  it('should store one Car', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = '/v1/cars'

    const createPayload = {
      brand: payload.brand,
      model: payload.model,
      version: payload.version,
      year: payload.year,
      mileage: payload.mileage,
      gearboxType: payload.gearboxType,
      price: payload.price,
    }

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .send(createPayload)
      .set('Authorization', token)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.brand).toBe(payload.brand)
  })

  it('should throw a validation error when data is null', async () => {
    const status = 400
    const method = 'POST'
    const code = 'Error'
    const path = '/v1/cars'

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('Authorization', token)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        statusCode: status,
        message: [
          'brand should not be empty',
          'brand must be a string',
          'model should not be empty',
          'model must be a string',
          'version should not be empty',
          'version must be a string',
          'year should not be empty',
          'year must be a number conforming to the specified constraints',
          'mileage should not be empty',
          'mileage must be a number conforming to the specified constraints',
          'gearboxType should not be empty',
          'gearboxType must be a string',
          'price should not be empty',
          'price must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
      },
    })
  })
})

let app: App
let token: string
let database: Database

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  const userRepository = database.getRepository<UserRepository>(UserRepository)

  const user = await userRepository.storeOne({
    name: 'João Lenon',
    email: 'jlenon7@hotmail.com',
    password: await bcrypt.hash('12345678', 10),
    token: new Token().generate('usr'),
  })

  const { body } = await request(app.server.getHttpServer())
    .post('/v1/auth/login')
    .send({ email: user.email, password: '12345678' })

  token = body.data.access_token
})

afterEach(async () => {
  await database.dropDatabase()
  await database.closeConnection()
  await app.closeApp()
})

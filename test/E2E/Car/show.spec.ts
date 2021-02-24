import 'start/env'
import * as bcrypt from 'bcrypt'
import * as request from 'supertest'

import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { CarRepository } from 'app/Repositories/CarRepository'
import { UserRepository } from 'app/Repositories/UserRepository'

describe('\n[E2E] Show Cars 🏘', () => {
  it('should return one car by token', async () => {
    const status = 200
    const method = 'GET'
    const code = 'RESPONSE'

    const car = await carRepository.storeOne({
      ...payload,
      token: new Token().generate('car'),
    })

    const path = `/v1/cars/${car.token}`

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('Authorization', token)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.brand).toBe(car.brand)
  })

  it('should throw a not found error', async () => {
    const status = 404
    const method = 'GET'
    const code = 'Error'
    const path = '/v1/cars/car-dssdadsadsadasd'

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('Authorization', token)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        error: 'Not Found',
        message: 'NOT_FOUND_CAR',
        statusCode: 404,
      },
    })
  })
})

let app: App
let token: string
let database: Database
let carRepository: CarRepository

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
  carRepository = database.getRepository(CarRepository)
})

afterEach(async () => {
  await database.dropDatabase()
  await database.closeConnection()
  await app.closeApp()
})

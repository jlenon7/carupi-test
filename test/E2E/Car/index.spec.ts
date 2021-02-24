import 'start/env'
import * as bcrypt from 'bcrypt'
import * as request from 'supertest'

import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { CarRepository } from 'app/Repositories/CarRepository'
import { UserRepository } from 'app/Repositories/UserRepository'

describe('\n[E2E] Index Cars 🏘', () => {
  it('should return all cars paginated', async () => {
    const status = 200
    const method = 'GET'
    const code = 'RESPONSE'
    const path = `/v1/cars?offset=0&limit=10`

    await carRepository.storeOne({
      ...payload,
      token: new Token().generate('car'),
    })

    await carRepository.storeOne({
      ...payload,
      token: new Token().generate('car'),
    })

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('Authorization', token)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.data).toHaveLength(2)
    expect(body.data.pagination.offset).toBe(0)
    expect(body.data.pagination.limit).toBe(10)
    expect(body.data.pagination.total).toBeTruthy()
  })

  it('should return all cars sinceYear and sincePrice', async () => {
    const status = 200
    const method = 'GET'
    const code = 'RESPONSE'
    const path = `/v1/cars?since_year=1980&max_year=2000&since_price=10000&max_price=200000`

    await carRepository.storeOne({
      ...payload,
      year: 1990,
      price: 22000,
      token: new Token().generate('car'),
    })
    await carRepository.storeOne({
      ...payload,
      year: 1990,
      price: 100000,
      token: new Token().generate('car'),
    })
    await carRepository.storeOne({
      ...payload,
      year: 2000,
      price: 200000,
      token: new Token().generate('car'),
    })

    // ! Should not exists
    await carRepository.storeOne({
      ...payload,
      year: 2021,
      price: 300000,
      token: new Token().generate('car'),
    })

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('Authorization', token)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.data).toHaveLength(3)
    expect(body.data.pagination.offset).toBe(0)
    expect(body.data.pagination.limit).toBe(10)
    expect(body.data.pagination.total).toBeTruthy()
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

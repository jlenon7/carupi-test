import 'start/env'

import { App } from 'test/Utils'
import { AppModule } from 'app/AppModule'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { CarRepository } from 'app/Repositories/CarRepository'
import { CarService } from 'app/Services/Api/CarService'

describe('\n[Unit] Car Service 🏘', () => {
  it('list', async () => {
    const pagination = {
      page: null,
      offset: 0,
      limit: 10,
    }

    const brand = 'Nissan'
    const model = 'GTR'
    const version = 'R34'
    const year = 1990
    const mileage = 1
    const gearboxType = 'manual'
    const price = 300000
    const status = 'approved'
    const token = new Token().generate()

    const results = [
      {
        brand,
        version,
        year,
        mileage,
        gearboxType,
        price,
        token,
        status,
        model,
      },
    ]

    jest.spyOn(carRepository, 'getAll').mockImplementation(async () => results)

    const cars = await carService.list(pagination, {
      sinceYear: undefined,
      maxYear: undefined,
      sincePrice: undefined,
      maxPrice: undefined,
    })

    expect(cars[0].brand).toBe(brand)
    expect(cars[0]._id).toBeFalsy()
  })

  it('show', async () => {
    const brand = 'Nissan'
    const model = 'GTR'
    const version = 'R34'
    const year = 1990
    const mileage = 1
    const gearboxType = 'manual'
    const price = 300000
    const status = 'approved'
    const token = new Token().generate()

    const object = {
      brand,
      version,
      year,
      mileage,
      gearboxType,
      price,
      token,
      status,
      model,
    }

    jest
      .spyOn(carRepository, 'getOne')
      .mockImplementation(async () => object as any)

    const car = await carService.show(token)

    expect(car._id).toBeFalsy()
    expect(car.token).toBe(token)
    expect(car.brand).toBe(brand)
    expect(car.version).toBe(version)

    try {
      jest.spyOn(carRepository, 'getOne').mockImplementation(async () => null)

      await carService.show(token)
    } catch (error) {
      expect(error.response.statusCode).toBe(404)
      expect(error.response.message).toBe('NOT_FOUND_CAR')
    }
  })
})

let app: App
let carService: CarService
let carRepository: CarRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()

  carService = app.getInstance<CarService>(CarService.name)
  carRepository = app.getInstance<CarRepository>(CarRepository.name)
})

afterEach(async () => {
  await app.closeApp()
})

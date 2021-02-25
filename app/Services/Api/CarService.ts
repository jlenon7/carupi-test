import {
  ApiRequestContract,
  PaginationContract,
} from '@secjs/core/build/Contracts'

import { UserDocument } from 'app/Schemas/User'
import { GuardBaseService } from '@secjs/core/build'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { CreateCarDto } from 'app/Contracts/Dtos/CreateCarDto'
import { CarRepository } from 'app/Repositories/CarRepository'
import { UpdateCarDto } from 'app/Contracts/Dtos/UpdateCarDto'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class CarService extends GuardBaseService<UserDocument> {
  @Inject(CarRepository) private carRepository: CarRepository

  async list(pagination: PaginationContract, queries) {
    const data: ApiRequestContract = {}

    data.where = [{ key: 'deletedAt', value: null }]

    if (queries.sinceYear && queries.maxYear) {
      data.where.push({
        key: 'year',
        value: {
          $gte: queries.sinceYear,
          $lte: queries.maxYear,
        },
      })
    }

    if (queries.sincePrice && queries.maxPrice) {
      data.where.push({
        key: 'price',
        value: {
          $gte: queries.sincePrice,
          $lte: queries.maxPrice,
        },
      })
    }

    return this.carRepository.getAll(pagination, data)
  }

  async createOne(dto: CreateCarDto) {
    dto.token = new Token().generate('car')

    return this.carRepository.storeOne(dto)
  }

  async show(token: string) {
    const car = await this.carRepository.getOne(null, {
      where: [
        { key: 'token', value: token },
        { key: 'deletedAt', value: null },
      ],
    })

    if (!car) {
      throw new NotFoundException('NOT_FOUND_CAR')
    }

    return car
  }

  async updateOne(token: string, dto: UpdateCarDto) {
    const car = await this.show(token)

    return this.carRepository.updateOne(car, dto)
  }

  // ! Soft Delete ALWAYS
  async deleteOne(token: string) {
    const car = await this.show(token)

    return this.carRepository.deleteOne(car)
  }
}

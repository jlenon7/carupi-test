import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Car, CarDocument } from 'app/Schemas/Car'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class CarRepository extends MongooseRepository<CarDocument> {
  @InjectModel(Car.name) protected Model: Model<CarDocument>
}

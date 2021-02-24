import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
export type CarDocument = Car & mongoose.Document

@Schema({ timestamps: true })
export class Car {
  @Prop({ type: String, required: true })
  brand: string

  @Prop({ type: String, required: true })
  model: string

  @Prop({ type: String, required: true })
  version: string

  @Prop({ type: Number, required: true, index: true })
  year: number

  @Prop({ type: Number, required: true })
  mileage: number

  @Prop({ type: String, required: true })
  gearboxType: string

  @Prop({ type: Number, required: true, index: true })
  price: number

  @Prop({ type: String, required: true, index: true, unique: true })
  token: string

  @Prop({ type: Date, default: null })
  deletedAt?: Date

  @Prop({ type: String, default: 'pendent' })
  status: 'pendent' | 'approved' | 'reproved' | string
}

export const CarSchema = SchemaFactory.createForClass(Car)

CarSchema.methods.toJSON = function() {
  const obj = this.toObject() as any

  delete obj._id
  delete obj.__v

  return obj
}

import { CreateCarDto } from 'app/Contracts/Dtos/CreateCarDto'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCarValidator extends CreateCarDto {
  @IsString()
  @IsNotEmpty()
  brand: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsString()
  @IsNotEmpty()
  version: string

  @IsNumber()
  @IsNotEmpty()
  year: number

  @IsNumber()
  @IsNotEmpty()
  mileage: number

  @IsString()
  @IsNotEmpty()
  gearboxType: string

  @IsNumber()
  @IsNotEmpty()
  price: number
}

import { UpdateCarDto } from 'app/Contracts/Dtos/UpdateCarDto'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCarValidator extends UpdateCarDto {
  @IsString()
  @IsOptional()
  brand: string

  @IsString()
  @IsOptional()
  model: string

  @IsString()
  @IsOptional()
  version: string

  @IsNumber()
  @IsOptional()
  year: number

  @IsNumber()
  @IsOptional()
  mileage: number

  @IsString()
  @IsOptional()
  gearboxType: string

  @IsNumber()
  @IsOptional()
  price: number
}

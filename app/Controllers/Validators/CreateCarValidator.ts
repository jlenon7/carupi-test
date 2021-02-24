import { ApiProperty } from '@nestjs/swagger'
import { CreateCarDto } from 'app/Contracts/Dtos/CreateCarDto'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCarValidator extends CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  brand: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  model: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  version: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  year: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  mileage: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gearboxType: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number
}

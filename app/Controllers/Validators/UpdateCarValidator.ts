import { ApiProperty } from '@nestjs/swagger'
import { UpdateCarDto } from 'app/Contracts/Dtos/UpdateCarDto'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCarValidator extends UpdateCarDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  brand: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  model: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  version: string

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  year: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  mileage: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  gearboxType: string

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: number
}

import {
  Controller,
  Get,
  Query,
  Inject,
  Param,
  Post,
  UseInterceptors,
  Body,
  UseGuards,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common'

import { JwtGuard } from './Guards/JwtGuard'
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger'
import { Pagination } from 'app/Decorators/Pagination'
import { CarService } from 'app/Services/Api/CarService'
import { CreateCarValidator } from '../Validators/CreateCarValidator'
import { UpdateCarValidator } from '../Validators/UpdateCarValidator'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import { PaginationContract } from '@secjs/core/build/Contracts/PaginationContract'

@ApiTags('Cars')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('/v1/cars')
@UseInterceptors(ResponseInterceptor)
export class CarController {
  @Inject(CarService) private carService: CarService

  @Get()
  @ApiQuery({ name: 'limit', allowEmptyValue: true })
  @ApiQuery({ name: 'offset', allowEmptyValue: true })
  @ApiQuery({ name: 'max_year', allowEmptyValue: true })
  @ApiQuery({ name: 'since_year', allowEmptyValue: true })
  @ApiQuery({ name: 'max_price', allowEmptyValue: true })
  @ApiQuery({ name: 'since_price', allowEmptyValue: true })
  async index(
    @Query() queries: any,
    @Pagination() pagination: PaginationContract,
  ) {
    const formatedQueries = {
      maxYear: parseInt(queries.max_year),
      sinceYear: parseInt(queries.since_year),
      maxPrice: parseInt(queries.max_price),
      sincePrice: parseInt(queries.since_price),
    }

    return this.carService.list(pagination, formatedQueries)
  }

  @Post()
  async store(@Body(ValidationPipe) body: CreateCarValidator) {
    return (await this.carService.createOne(body)).toJSON()
  }

  @Get('/:token')
  async show(@Param('token') token: string) {
    return (await this.carService.show(token)).toJSON()
  }

  @Put('/:token')
  async update(
    @Param('token') token: string,
    @Body(ValidationPipe) body: UpdateCarValidator,
  ) {
    return (await this.carService.updateOne(token, body)).toJSON()
  }

  @Delete('/:token')
  async delete(@Param('token') token: string) {
    return (await this.carService.deleteOne(token)).toJSON()
  }
}

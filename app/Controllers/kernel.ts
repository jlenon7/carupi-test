import { RequestMethod } from '@nestjs/common'

/*
|--------------------------------------------------------------------------
| Http Controllers
|--------------------------------------------------------------------------
|
| All Http Controllers of the application.
|
*/
export const httpControllers = [
  require('./Http/CarController').CarController,
  require('./Http/AuthController').AuthController,
  require('./Http/WelcomeController').WelcomeController,
]

/*
|--------------------------------------------------------------------------
| Collections
|--------------------------------------------------------------------------
|
| All Collections of other applications.
|
*/

export const collections = []

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
|
| All Middlewares of the application.
|
*/

export const middlewares = [
  {
    middleware: require('./Http/Middlewares/PaginationMiddleware')
      .PaginationMiddleware,
    routes: [{ path: '/v1/cars', method: RequestMethod.GET }],
  },
]

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
|
| All Filters of the application.
|
*/

export const filters = [
  require('./Http/Filters/HttpExceptionFilter').HttpExceptionFilter,
]

/*
|--------------------------------------------------------------------------
| Guards
|--------------------------------------------------------------------------
|
| All type of guards of the application.
|
*/

export const guards = [
  require('./Http/Guards/JwtGuard').JwtGuard,
  require('./Http/Guards/JwtStrategy').JwtStrategy,
]

/*
|--------------------------------------------------------------------------
| Interceptors
|--------------------------------------------------------------------------
|
| All Interceptors of the application.
|
*/

export const interceptors = [
  require('./Http/Interceptors/ResponseInterceptor').ResponseInterceptor,
]

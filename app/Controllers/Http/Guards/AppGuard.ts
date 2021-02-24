import {
  HttpStatus,
  Injectable,
  CanActivate,
  HttpException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest()

    if (!request.headers.authorization) {
      throw new UnauthorizedException(
        'TOKEN_NOT_FOUND',
        'Any token found in context',
      )
    }

    request.user = await this.validateToken(request.headers.authorization)

    return true
  }

  async validateToken(auth: string): Promise<any> {
    let token = ''

    if (auth.split(' ')[0] === 'Bearer') {
      token = auth.split(' ')[1]
    } else {
      token = auth.split(' ')[0]
    }

    try {
      return this.jwtService.verify(token)
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}

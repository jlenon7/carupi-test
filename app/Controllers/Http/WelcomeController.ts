import { ApiTags } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { Controller, Get } from '@nestjs/common'

@Controller()
@ApiTags('Welcome')
export class WelcomeController {
  constructor(private configService: ConfigService) {}

  @Get()
  async welcome() {
    return {
      greeting: `Welcome to ${this.configService.get<string>('app.name')}!`,
      domain: this.configService.get<string>('app.name'),
      prefix: this.configService.get<string>('app.prefix'),
      version: this.configService.get<string>('app.version'),
    }
  }
}

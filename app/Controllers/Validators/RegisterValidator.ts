import { Match } from 'app/Decorators/Match'
import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterValidator {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @Match('password')
  password_confirmation: string
}

import 'start/env'
import * as bcrypt from 'bcrypt'

import { App } from 'test/Utils'
import { AppModule } from 'app/AppModule'
import { AuthService } from 'app/Services/Api/AuthService'
import { UserService } from 'app/Services/Api/UserService'
import { Token } from '@secjs/core/build/Utils/Classes/Token'

describe('\n[Unit] Auth Service 🏘', () => {
  it('validateUser', async () => {
    const name = 'João Lenon'
    const status = 'approved'
    const password = '12345678'
    const token = new Token().generate()
    const email = 'jmartinifilho@gmail.com'

    const object = {
      name,
      email,
      token,
      status,
      password: await bcrypt.hash(password, 10),
    }

    jest
      .spyOn(userService, 'findOneByEmail')
      .mockImplementation(async () => object as any)

    const userExpect = await authService.validateUser(email, password)

    expect(userExpect.name).toBe(name)
    expect(userExpect.email).toBe(email)
    expect(userExpect.token).toBe(token)
  })

  it('login', async () => {
    const name = 'João Lenon'
    const status = 'approved'
    const password = '12345678'
    const token = new Token().generate()
    const email = 'jmartinifilho@gmail.com'

    const object = {
      name,
      email,
      token,
      status,
      password: await bcrypt.hash(password, 10),
    }

    jest
      .spyOn(authService, 'validateUser')
      .mockImplementation(async () => object as any)

    const { access_token } = await authService.login(email, password)

    expect(access_token).toBeTruthy()

    try {
      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(async () => null)

      await authService.login(email, password)
    } catch (error) {
      expect(error.response.statusCode).toBe(401)
      expect(error.response.message).toBe('USER_NOT_FOUND')
    }
  })
})

let app: App
let userService: UserService
let authService: AuthService

beforeEach(async () => {
  app = await new App([AppModule]).initApp()

  authService = app.getInstance<AuthService>(AuthService.name)
  userService = app.getInstance<UserService>(UserService.name)
})

afterEach(async () => {
  await app.closeApp()
})

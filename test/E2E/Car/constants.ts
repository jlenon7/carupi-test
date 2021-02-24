import { Token } from '@secjs/core/build/Utils/Classes/Token'

const payload = {
  brand: 'Nissan',
  model: 'Skyline',
  version: 'R34',
  year: 1990,
  mileage: 0,
  gearboxType: 'manual',
  price: 100000,
  token: new Token().generate('car'),
  deletedAt: null,
  status: 'approved',
}

export { payload }

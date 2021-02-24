export class CreateCarDto {
  brand: string
  model: string
  version: string
  year: number
  mileage: number
  gearboxType: string
  price: number
  token?: string
}

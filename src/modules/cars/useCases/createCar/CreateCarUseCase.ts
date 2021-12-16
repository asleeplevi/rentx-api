import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    category_id,
    brand,
    fine_amount,
    license_plate,
    daily_rate
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)

    if (carAlreadyExists) throw new AppError('Car already exists')

    const car = await this.carsRepository.create({
      name,
      description,
      category_id,
      brand,
      fine_amount,
      license_plate,
      daily_rate
    })
    return car
  }
}

export { CreateCarUseCase }

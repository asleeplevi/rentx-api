import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  car_id: string
  expect_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ expect_return_date, car_id, user_id }: IRequest): Promise<Rental> {
    const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
    if (carUnAvailable) throw new AppError('Car is unavailable')

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) throw new AppError("There's a rental in progress for user!")

    const dateNow = this.dateProvider.dateNow()
    const compare = this.dateProvider.compareInHours(dateNow, expect_return_date)

    if (compare < 24) throw new AppError('The min rental hour is 24 hours')

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expect_return_date
    })

    await this.carsRepository.updateAvailable(rental.car_id, false)

    return rental
  }
}

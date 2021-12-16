import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)

    if (!rental) throw new AppError('Rental does not exists')
    if (rental.end_date) throw new AppError('Rental already ended')

    const dateNow = this.dateProvider.dateNow()
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)
    const delay = this.dateProvider.compareInDays(rental.expect_return_date, dateNow)

    let total = 0

    if (daily <= 0) daily = 1
    if (delay > 0) {
      const calculateFine = delay * car.fine_amount
      total += calculateFine
    }

    total += daily * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)

    await this.carsRepository.updateAvailable(rental.car_id, true)

    return rental
  }
}

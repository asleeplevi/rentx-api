import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository'
import { getRepository, Repository } from 'typeorm'
import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { end_date: null, car_id } })
    return rental
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { end_date: null, user_id } })
    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id)

    return rental
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)
    await this.repository.save(rental)

    return rental
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.repository.find({ where: { user_id }, relations: ['car'] })

    return rentals
  }
}

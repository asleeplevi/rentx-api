import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, data)

    this.cars.push(car)
    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async findAvailable(category_id: string, name: string, brand: string): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => {
      if (!car.available) return false
      if (category_id && car.category_id === category_id) return true
      if (name && car.name === name) return true
      if (brand && car.brand === brand) return true
      return true
    })

    return availableCars
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)
  }

  async updateAvailable(id: string, available: boolean) {
    const findIndex = this.cars.findIndex((car) => car.id === id)
    this.cars[findIndex].available = available
  }
}

export { CarsRepositoryInMemory }

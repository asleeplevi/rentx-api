import { describe, beforeEach, it, expect } from '@jest/globals'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './listAvailableCarsListCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('list cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car available',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'def-123',
      fine_amount: 10,
      brand: 'Audi',
      category_id: '123'
    })

    const cars = await listAvailableCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })

  it('should be able to list all available car by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'def-123',
      fine_amount: 10,
      brand: 'Audi',
      category_id: '123'
    })

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car1' })
    expect(cars).toEqual([car])
  })

  it('should be able to list all available car by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'def-123',
      fine_amount: 10,
      brand: 'Audi',
      category_id: '123'
    })

    const cars = await listAvailableCarsUseCase.execute({ category_id: '123' })
    expect(cars).toEqual([car])
  })

  it('should be able to list all available car by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'def-123',
      fine_amount: 10,
      brand: 'Audi',
      category_id: '123'
    })

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Audi' })
    expect(cars).toEqual([car])
  })
})

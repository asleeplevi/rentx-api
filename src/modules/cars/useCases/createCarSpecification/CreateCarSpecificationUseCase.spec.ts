import { describe, beforeEach, it, expect } from '@jest/globals'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })
  it("should not be able to add a new specification car when car_id doesn't exists", () => {
    expect(async () => {
      const car_id = '123'
      const specifications_id = ['4321']

      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      brand: 'CarBrand',
      daily_rate: 150.0,
      category_id: '123',
      description: 'Car Description',
      fine_amount: 50.0,
      license_plate: 'VAC-123'
    })

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test'
    })

    const specifications_id = [specification.id]

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    })

    expect(specificationsCar).toHaveProperty('specifications')
    expect(specificationsCar.specifications.length).toBe(1)
  })
})

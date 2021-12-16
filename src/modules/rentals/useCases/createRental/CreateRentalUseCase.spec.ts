import { describe, beforeEach, it, expect } from '@jest/globals'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'
import dayjs from 'dayjs'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepositoryInMemory: RentalRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dateProvider: IDateProvider
let carsRepository: ICarsRepository

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(24, 'hours').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    carsRepository = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepository
    )
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'test',
      description: 'car test',
      daily_rate: 10,
      license_plate: 'test',
      fine_amount: 40,
      brand: '123',
      category_id: '123'
    })
    const rental = await createRentalUseCase.execute({
      user_id: '123123',
      car_id: car.id,
      expect_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car = await carsRepository.create({
      name: 'test-2',
      description: 'car test',
      daily_rate: 10,
      license_plate: 'test-123',
      fine_amount: 40,
      brand: '123',
      category_id: '123'
    })

    const car2 = await carsRepository.create({
      name: 'test-22',
      description: 'car test',
      daily_rate: 10,
      license_plate: 'test-123',
      fine_amount: 40,
      brand: '123',
      category_id: '123'
    })

    await createRentalUseCase.execute({
      user_id: '123123',
      car_id: car.id,
      expect_return_date: dayAdd24Hours
    })
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123123',
        car_id: car2.id,
        expect_return_date: dayAdd24Hours
      })
    }).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await carsRepository.create({
      name: 'test-3',
      description: 'car test 33',
      daily_rate: 10,
      license_plate: 'test-33',
      fine_amount: 40,
      brand: '123',
      category_id: '123'
    })
    await createRentalUseCase.execute({
      user_id: '123',
      car_id: car.id,
      expect_return_date: dayAdd24Hours
    })

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '321',
        car_id: car.id,
        expect_return_date: dayAdd24Hours
      })
    }).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should no be able to create a new rental if the expect return date is lower than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '121',
        expect_return_date: new Date()
      })
    }).rejects.toEqual(new AppError('The min rental hour is 24 hours'))
  })
})

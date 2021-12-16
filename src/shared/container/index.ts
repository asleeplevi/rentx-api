import { container } from 'tsyringe'
import '@shared/container/providers'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImageRepository>('CarsImageRepository', CarsImageRepository)

container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository)

container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository)

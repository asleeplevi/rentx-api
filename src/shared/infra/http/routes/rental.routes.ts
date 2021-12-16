import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUsers/ListRentalsByUserController'
import { Router } from 'express'
import { ensureAuthtenticate } from '../middlewares/ensureAuthenticate'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', ensureAuthtenticate, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthtenticate, devolutionRentalController.handle)
rentalRoutes.get('/user', ensureAuthtenticate, listRentalsByUserController.handle)

export { rentalRoutes }

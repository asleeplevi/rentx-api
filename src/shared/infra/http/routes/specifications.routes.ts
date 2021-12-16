import { Router } from 'express'
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAuthtenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

export const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
specificationRoutes.post(
  '/',
  ensureAuthtenticate,
  ensureAdmin,
  createSpecificationController.handle
)

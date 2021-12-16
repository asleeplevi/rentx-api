import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsController'
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController'
import { Router } from 'express'
import uploadConfig from '@config/upload'
import multer from 'multer'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthtenticate } from '../middlewares/ensureAuthenticate'

const carsRoutes = Router()
const uploadCarImage = multer(uploadConfig)

const createCarController = new CreateCarController()
const listAvailableController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarsImageController = new UploadCarImageController()
carsRoutes.post('/', ensureAuthtenticate, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', listAvailableController.handle)
carsRoutes.post(
  '/specifications/:id',
  ensureAuthtenticate,
  ensureAdmin,
  createCarSpecificationController.handle
)
carsRoutes.post(
  '/images/:id',
  ensureAuthtenticate,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarsImageController.handle
)

export { carsRoutes }

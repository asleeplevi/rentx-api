import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoryController } from '@modules/cars/useCases/listCategories/ListCategoryController'
import { ensureAuthtenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post('/', ensureAuthtenticate, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get('/', listCategoryController.handle)

categoriesRoutes.post(
  '/import',
  ensureAuthtenticate,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
)

export { categoriesRoutes }

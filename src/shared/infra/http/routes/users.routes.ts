import { Router } from 'express'
import multer from 'multer'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import uploadConfig from '@config/upload'
import { ensureAuthtenticate } from '../middlewares/ensureAuthenticate'
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCases/ProfileUserController'
const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handler)
usersRoutes.patch(
  '/avatar',
  ensureAuthtenticate,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)
usersRoutes.get('/me', ensureAuthtenticate, profileUserController.handle)

export { usersRoutes }

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordController'
import { Router } from 'express'

const passwordRoutes = Router()

const sendForgotPasswordController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordUserController()

passwordRoutes.post('/forgot', sendForgotPasswordController.handle)
passwordRoutes.post('/reset', resetPasswordController.handle)

export { passwordRoutes }

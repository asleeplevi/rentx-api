import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { password, email } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await authenticateUserUseCase.execute({ email, password })

    return response.status(200).json(token)
  }
}

export { AuthenticateUserController }

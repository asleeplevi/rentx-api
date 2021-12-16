import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'

export class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { token } = request.query
    const { password } = request.body

    const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)

    await resetPasswordUserUseCase.execute({ token: token as string, password })

    return response.end()
  }
}

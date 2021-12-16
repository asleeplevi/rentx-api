import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handler(request: Request, response: Response): Promise<void> {
    const { name, email, password, driver_license } = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license
    })

    response.status(201).end()
  }
}

export { CreateUserController }

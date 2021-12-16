import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCarUseCase } from './CreateCarUseCase'

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, category_id, brand, fine_amount, license_plate, daily_rate } =
      request.body
    const createCarUseCase = container.resolve(CreateCarUseCase)

    const car = await createCarUseCase.execute({
      name,
      description,
      category_id,
      brand,
      fine_amount,
      license_plate,
      daily_rate
    })

    return response.status(201).json(car)
  }
}

export { CreateCarController }

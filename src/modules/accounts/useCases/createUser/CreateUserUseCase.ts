import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { hash } from 'bcrypt'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, driver_license }: IUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) throw new AppError('User already exists')

    const passwordHash = await hash(password, 11)
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license
    })
  }
}
export { CreateUserUseCase }

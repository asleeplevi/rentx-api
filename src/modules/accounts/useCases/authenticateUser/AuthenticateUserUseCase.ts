import auth from '@config/auth'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refreshToken: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('Email or password incorrect', 401)

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError('Email or password incorrect', 401)

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token
    })

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token
    })

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: this.dateProvider.addDays(30),
      refresh_token: refreshToken
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refreshToken
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }

import auth from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refreshToken: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) throw new AppError('Refresh Token does not exists', 401)

    await this.usersTokensRepository.deleteById(userToken.id)

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const newToken = sign({}, auth.secret_token, {
      subject: sub,
      expiresIn: auth.expires_in_token
    })

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addDays(30),
      user_id: userToken.user_id,
      refresh_token: refreshToken
    })

    return { token: newToken, refreshToken }
  }
}

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens'
import { IUsersTokensRepository } from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = []

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, data)

    this.usersTokens.push(userToken)
    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const tokenIndex = this.usersTokens.findIndex((item) => item.id === id)
    this.usersTokens.splice(tokenIndex)
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    return this.usersTokens.find((userToken) => userToken.refresh_token === token)
  }

  async findByUserIdAndRefreshToken(user_id: string, refreshToken: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (token) => token.user_id === user_id && token.refresh_token === refreshToken
    )
    return userToken
  }
}

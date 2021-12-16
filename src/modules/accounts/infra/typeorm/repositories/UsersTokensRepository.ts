import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { getRepository, Repository } from 'typeorm'
import { UserTokens } from '../entities/UserTokens'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data)

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(id: string, refreshToken: string): Promise<UserTokens> {
    const token = await this.repository.findOne({
      where: { user_id: id, refresh_token: refreshToken }
    })

    return token
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    const usertoken = await this.repository.findOne({ where: { refresh_token: token } })

    return usertoken
  }
}

import { IUsersDTO, IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'
import { User } from '../entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: IUsersDTO): Promise<void> {
    const user = this.repository.create(data)
    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email })

    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.findOne(id)

    return user
  }
}

export { UsersRepository }

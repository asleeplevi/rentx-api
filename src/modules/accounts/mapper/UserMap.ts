import { IUserResponseDTO } from '../dtos/IUserResponseDTO'
import { classToClass } from 'class-transformer'
import { User } from '../infra/typeorm/entities/User'

export class UserMap {
  static toDTO({ email, name, id, avatar, avatar_url, driver_license }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      avatar_url,
      driver_license
    })
    return user as IUserResponseDTO
  }
}

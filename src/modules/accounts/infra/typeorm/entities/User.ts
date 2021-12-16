import { v4 as uuidV4 } from 'uuid'
import { Entity, PrimaryColumn, Column } from 'typeorm'
import { Expose } from 'class-transformer'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  driver_license: string

  @Column()
  avatar?: string

  @Column()
  isAdmin: boolean

  @Column()
  created_at: Date

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.disk) {
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
      case 'local':
        return `http://localhost:${process.env.PORT}/avatar/${this.avatar}`
      default:
        return null
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { User }

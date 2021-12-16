import { Specification } from '../infra/typeorm/entities/Specification'

interface ISpecificationsCreateDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsCreateDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ISpecificationsCreateDTO }

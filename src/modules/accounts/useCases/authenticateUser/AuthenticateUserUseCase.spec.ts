import 'reflect-metadata'
import { describe, it, expect, beforeEach } from '@jest/globals'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { IUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { AppError } from '@shared/errors/AppError'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let userTokenRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: IDateProvider

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokenRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to sign in and receive a valid token', async () => {
    const user: IUsersDTO = {
      driver_license: '000123',
      email: 'user@teste.com',
      password: '1234',
      name: 'User Test'
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com.br',
        password: '213123'
      })
    }).rejects.toEqual(new AppError('Email or password incorrect', 401))
  })

  it('should not be able to authenticate with incorrect password', async () => {
    const user: IUsersDTO = {
      driver_license: '000123',
      email: 'user@teste.com',
      password: '1234',
      name: 'User Test'
    }

    await createUserUseCase.execute(user)

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password'
      })
    }).rejects.toEqual(new AppError('Email or password incorrect', 401))
  })
})

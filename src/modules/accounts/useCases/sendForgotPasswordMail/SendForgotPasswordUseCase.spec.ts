import { describe, beforeEach, it, jest, expect } from '@jest/globals'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory'
import { AppError } from '@shared/errors/AppError'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepository: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    usersTokensRepository = new UsersTokensRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepository,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')
    await usersRepositoryInMemory.create({
      driver_license: '664169',
      email: 'test@rentx.com.br',
      name: 'rentxt',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('test@rentx.com.br')
    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('not@exists.com.br')).rejects.toEqual(
      new AppError('User does not exists')
    )
  })

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, 'create')

    await usersRepositoryInMemory.create({
      driver_license: '664169',
      email: 'test2@rentx.com.br',
      name: 'rentxt',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('test2@rentx.com.br')

    expect(generateTokenMail).toHaveBeenCalled()
  })
})

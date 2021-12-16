import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import auth from '@config/auth'

interface IPayload {
  iat: number
  exp: number
  sub: string
}

export async function ensureAuthtenticate(request: Request, _: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('No token provided', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, auth.secret_token) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(sub)

    if (!user) throw new AppError('User does not exists', 401)
    request.user = { id: sub }
    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}

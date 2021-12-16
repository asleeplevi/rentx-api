import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'

import createConnection from '@shared/infra/typeorm/index'
import '@shared/container'
import { router } from './routes'
import swaggerFile from '../../../swagger.json'
import { AppError } from '@shared/errors/AppError'
import upload from '@config/upload'

createConnection()
const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
app.use(router)
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))
app.use((err: Error, _: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({ error: err.message })
    next()
  }

  response.status(200).json({
    status: 'error',
    error: `Internal server error ${err.message}`
  })
  next()
})

export { app }

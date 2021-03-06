import request from 'supertest'
import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

import { describe, it, expect, afterAll, beforeAll } from '@jest/globals'
import { Connection } from 'typeorm'
import { hash } from 'bcrypt'
import { v4 } from 'uuid'

let connection: Connection
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = v4()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email,password, "isAdmin", created_at, driver_license) 
    values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const token = responseToken.body.token

    await request(app)
      .post('/categories')
      .send({
        name: 'Categories supertest',
        description: 'Categorsy supertest'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Categories supertest')
  })
})

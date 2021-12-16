import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'
import { IMailProvider, ISendMailProps } from '../IMailProvider'
import fs from 'fs'
import handlebars from 'handlebars'

export class SESMailProvider implements IMailProvider {
  private client: Transporter
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_SES,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SES
      })
    })
  }

  async sendMail({ templatePath, variables, ...data }: ISendMailProps): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    console.log(this.client)
    await this.client.sendMail({
      ...data,
      html: templateHTML,
      from: 'Rentx <contato@devlevi.com>'
    })
  }
}

export interface ISendMailProps {
  to: string
  subject: string
  variables: any
  templatePath: string
}

export interface IMailProvider {
  sendMail(data: ISendMailProps): Promise<void>
}

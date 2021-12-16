import { IMailProvider, ISendMailProps } from '../IMailProvider'

export class MailProviderInMemory implements IMailProvider {
  private message = []
  async sendMail(data: ISendMailProps): Promise<void> {
    this.message.push(data)
  }
}

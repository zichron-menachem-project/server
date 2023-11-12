import { Controller, Post, Query } from '@nestjs/common';
import { SendGridService } from './sendGrid.service'; // add this

@Controller('mail')
export class MailController {
  constructor(private sendGridService: SendGridService) {}

  @Post('send-email')
  async sendEmail(@Query('email') email) {
    const mail = {
      to: email,
      subject: 'Hello from sendgrid',
      from: 'ezerplace@gmail.com',
      text: 'Hello',
      html: '<h1>Hello</h1>',
    };

    return await this.sendGridService.send(mail);
  }
}


import { BadRequestException, Injectable, Logger } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

type Attachment = {
  ContentType: string;
  Filename: string;
  Base64Content: string; // Ahora siempre se espera que Base64Content sea proporcionado
};


export class MailjetService {
  private readonly logger = new Logger(MailjetService.name);

  constructor(

  ) {

    if (!mailjet) {
      throw new Error('Failed to initialize Mailjet client.');
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    textPart: string,
    htmlPart: string,
    attachments: Attachment[] = [], // Base64Content debe ser proporcionado si hay adjuntos
  ): Promise<void> {
    const messages = {
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_MAIL_FROM, // Tu dirección de correo de envío
            Name: process.env.MAILJET_NAME_FROM, // Tu nombre o el de tu empresa
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TextPart: textPart,
          HTMLPart: htmlPart,
          Attachments: attachments.map(
            ({ ContentType, Filename, Base64Content }) => ({
              ContentType,
              Filename,
              Base64Content,
            }),
          ),
        },
      ],
    };

    try {
      await mailjet.post('send', { version: 'v3.1' }).request(messages);
      console.log('Email sent successfully');
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Error sending email: ${error}`);
    }
  }
}

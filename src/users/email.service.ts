import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        logger: true, // Habilita logs
        debug: true,  // Mostra depuração
      });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`E-mail enviado para ${to}`);
    } catch (error) {
      console.error(`Erro ao enviar e-mail: ${error.message}`);
      throw new Error('Falha ao enviar e-mail');
    }
  }
}
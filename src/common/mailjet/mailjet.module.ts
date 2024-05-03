import { Module } from '@nestjs/common';
import { MailjetService } from './mailjet.service';
import { JWtUtil } from '../utils';



@Module({
  providers: [MailjetService],
  exports: [MailjetService],
  imports: []
})
export class MailjetModule {}

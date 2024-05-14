import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { WSocketGateway } from './wsocket.gateway';
import { WSocketService } from './wsocket.service';


@Module({
  imports:[
    AuthModule
  ],
  providers: [WSocketGateway, WSocketService],
})
export class WSocketModule {}

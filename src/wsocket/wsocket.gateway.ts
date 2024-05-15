import {
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { JWtUtil } from 'src/common/utils';
import { WSocketService } from './wsocket.service';

@WebSocketGateway(+process.env.WS_PORT, { cors: true })
export class WSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly wSocketService: WSocketService,
    private readonly jwtUtil: JWtUtil,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('Se ejecuta cuando inicia');
  }

  handleConnection(client: any, ...args: any[]) {
    const token = client.handshake.headers.token;

    if (!token) {
      client.disconnect();
    }

    try {
      const { userId } = this.jwtUtil.verifyToken(token.toString());

      const checkUserConnection: boolean =
        this.wSocketService.checkUserConnection(userId);
      if (!checkUserConnection) {
        this.wSocketService.registerClient(client, userId);
      }
      // console.log('Hola alguien se conecto al socket 👌👌👌', verifyToken);
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.wSocketService.removeClient(client.id);
    console.log('ALguien se fue! chao chao');
  }

  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event_message') //TODO Backend
  handleIncommingMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    console.log(client);

    const { room, message } = payload;
    console.log(payload);
    this.server.to(`room_${room}`).emit('new_message', message);
  }
}

import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConnectedClients } from './interfaces';
import { FindUserUseCase } from 'src/auth/use-cases';

@Injectable()
export class WSocketService {
  constructor(private readonly findUserUseCase: FindUserUseCase) {}

  private connectedClients: ConnectedClients = {};

  async registerClient(client: Socket, userId: string) {
    const user = await this.findUserUseCase.execute(userId);
    if (!user) return;

    this.connectedClients[client.id] = {
      socket: client,
      userId: user.id,
    };

    console.log(this.connectedClients);
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
    console.log(this.connectedClients);
  }

   checkUserConnection(userId: string): boolean {


    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedClient = this.connectedClients[clientId];

      if (connectedClient.userId === userId) {
        return true;
      }
    }

    return false;
  }

}

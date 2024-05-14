import { Socket } from "socket.io";
import { User } from "src/auth/entities/user.entity";

export interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        // user: User,
        userId: string
        // desktop: boolean, //Perimitir una sola conexion en Desktop
        // mobile: boolean   //Perimitir una sola conexion en Mobile
    };
}
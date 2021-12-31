import { Injectable, OnDestroy } from '@angular/core';
import io, { Socket } from 'socket.io-client';

import { Message } from '../message.model';
import { RoomService } from '../room/room.service';

@Injectable({ providedIn: 'root' })
export class MessageService implements OnDestroy {
  socket: Socket;

  constructor(private roomService: RoomService) {
    this.socket = io('http://localhost:3000');

    this.messages = [];

    this.roomService.selectedRoom$.subscribe((selectedRoom) => {
      this.socket.emit('serverregisterroom', selectedRoom?._id);
    });

    //this.socket.emit("serverregisterroom",)

    // calling .bind(this) is necessary 'cause otherwise "this" will point to the socket not the service.
    this.socket.on('clientmessage', this.handleClientMessage.bind(this));
  }
  ngOnDestroy(): void {
    this.socket.close();
  }

  messages: Message[];

  getMessages(): Message[] {
    return this.messages;
  }

  handleClientMessage(message: Message) {
    this.messages.push(message);
  }

  postMessage(message: Message) {
    this.messages.push(message);

    // Inform the server about it
    this.socket.emit('servermessage', message);
  }
}

import { Component } from '@angular/core';
import { Message } from '../message.model';
import { RoomService } from '../room/room.service';
import { MessageService } from './message.service';

@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  selector: 'app-message',
})
export class MessageComponent {
  messages: Message[];

  constructor(
    private messageService: MessageService,
    private roomService: RoomService
  ) {
    this.messages = messageService.getMessages();
  }

  canShow(message: Message) {
    return message.roomId == this.roomService.selectedRoom;
  }
}

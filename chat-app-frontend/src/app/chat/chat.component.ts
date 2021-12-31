import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MessageService } from './message/message.service';

import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { RoomService } from './room/room.service';
import { Room } from './room.model';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  submitChat(form: NgForm) {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      //if (!user) return; // If we are not logged in we are clearly not allowed to send messages.

      this.roomService.selectedRoom$.pipe(take(1)).subscribe((room) => {
        this.messageService.postMessage({
          date: new Date(),
          message: form.value.message,
          roomId: `${room?._id}`, // using this trick we send empty string when things are undefined
          username: `${user?.firstName}`,
          userId: `${user?._id}`,
        });
      });

      form.reset();
    });
  }
}

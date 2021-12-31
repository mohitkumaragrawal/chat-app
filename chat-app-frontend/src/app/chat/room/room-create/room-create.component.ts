import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomService } from '../room.service';

@Component({
  templateUrl: 'room-create.component.html',
})
export class RoomCreateComponent {
  constructor(private roomService: RoomService, private route: Router) {}

  submitForm(form: NgForm) {
    if (form.invalid) return;

    const title: string = form.value.title;
    const subtitle: string = form.value.subtitle;
    const imageUrl: string = form.value.imageurl;

    this.roomService.newRoom(title, subtitle, imageUrl).subscribe(() => {
      this.route.navigate(['/chat']);
    });
  }
}

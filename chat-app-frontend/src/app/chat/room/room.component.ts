import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room.model';
import { RoomService } from './room.service';

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['room.component.scss'],
  selector: 'app-room',
})
export class RoomComponent implements OnInit {
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {}

  getRooms(): Observable<Room[]> {
    return this.roomService.rooms$;
  }
}

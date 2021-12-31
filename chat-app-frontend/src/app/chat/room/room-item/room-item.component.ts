import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../../room.model';
import { RoomService } from '../room.service';

@Component({
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss'],
  selector: 'app-room-item',
})
export class RoomItemComponent implements OnInit, OnDestroy {
  @Input()
  room: Room;

  isSelected: boolean = false;

  selectedRoomSubscription: Subscription;

  constructor(private roomService: RoomService) {}

  ngOnDestroy(): void {
    if (this.selectedRoomSubscription) {
      this.selectedRoomSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.selectedRoomSubscription = this.roomService.selectedRoom$.subscribe(
      (room) => {
        if (room == null) return;
        if (this.room == room) {
          // This is selected room
          this.isSelected = true;
        } else {
          // selected room changed and we need to reflect it in the ui
          this.isSelected = false;
        }
      }
    );
  }

  onClick() {
    this.roomService.selectedRoom$.next(this.room);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Room } from '../room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService implements OnDestroy {
  selectedRoomId: string;

  // This is an observable because we want to update the ui whenever there is a change here.
  rooms$ = new BehaviorSubject<Room[]>([]);

  selectedRoom$ = new BehaviorSubject<Room | null>(null);
  selectedRoom: string = '';

  private selectedRoomSubscription: Subscription;

  constructor(private httpClient: HttpClient) {
    this.refresh();

    this.selectedRoomSubscription = this.selectedRoom$.subscribe((value) => {
      if (value) {
        this.selectedRoom = value._id;
      }
    });
  }
  ngOnDestroy(): void {
    this.selectedRoomSubscription.unsubscribe();
  }

  refresh() {
    this.httpClient
      .get<Room[]>('http://localhost:3000/api/room')
      .subscribe((value) => {
        this.rooms$.next(value);

        if (value.length >= 1) {
          // We have atleast one room
          this.selectedRoom$.next(value[0]); // First one is selected (by default)
        }
      });
  }

  newRoom(title: string, subtitle: string, logoUrl: string) {
    return this.httpClient
      .post<Room>('http://localhost:3000/api/room', {
        title,
        subtitle,
        logoUrl,
      })
      .pipe(
        tap((createdRoom: Room) => {
          this.rooms$.pipe(take(1)).subscribe((value) => {
            value.push(createdRoom);
            this.rooms$.next(value);
          });
        })
      );
  }
}

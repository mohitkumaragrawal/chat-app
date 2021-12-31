import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { routeAnimation } from './route-animations';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;

  userSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      if (!user) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }

  prepareOutlet(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      (outlet.activatedRouteData['animationState'] as string)
    );
  }

  logout() {
    this.authService.user$.next(null);
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((value) => {
        if (!value) {
          // There is no user logged in,
          return next.handle(req); // don't append the token
        }

        // we have a user logged in.
        const token = value.token;

        if (!token) {
          return next.handle(req);
        }

        return next.handle(
          req.clone({
            headers: new HttpHeaders().set('Token', token),
          })
        );
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UserModel } from './user.model';

const AUTH_API_URL = 'http://localhost:3000/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<UserModel | null>(null);

  constructor(private httpClient: HttpClient) {}

  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<UserModel> {
    return this.httpClient
      .post<UserModel>(AUTH_API_URL, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: password,
      })
      .pipe(
        catchError((error) => {
          throw error;
        }),
        tap((value) => {
          // this will automatically login the user when he log in.
          this.user$.next(value);
        })
      );
  }

  loginUser(email: string, password: string): Observable<UserModel> {
    return this.httpClient
      .get<UserModel>(AUTH_API_URL, {
        params: {
          email: email,
          pass: password,
        },
      })
      .pipe(
        catchError((error) => {
          throw error;
        }),
        tap((value) => this.user$.next(value))
      );
  }
}

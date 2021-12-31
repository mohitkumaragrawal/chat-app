import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { MessageItemComponent } from './chat/message/message-item/message-item.component';
import { MessageComponent } from './chat/message/message.component';
import { RoomItemComponent } from './chat/room/room-item/room-item.component';
import { RoomComponent } from './chat/room/room.component';
import { MustMatchDirective } from './auth/must-match.directive';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RoomCreateComponent } from './chat/room/room-create/room-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChatComponent,
    RoomComponent,
    RoomItemComponent,
    MessageComponent,
    MessageItemComponent,
    MustMatchDirective,
    RoomCreateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

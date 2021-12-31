import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { RoomCreateComponent } from './chat/room/room-create/room-create.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      animationState: 'signup',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      animationState: 'login',
    },
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {
      animationState: 'chat',
    },
  },
  {
    path: 'addroom',
    component: RoomCreateComponent,
    data: {
      animationState: 'addroom',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

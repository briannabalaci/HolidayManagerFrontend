import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { EventEntity } from './data-types/event';
import { EventService } from './services/event.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    LoginService,
    EventService
  ]
})
export class SharedModule { }

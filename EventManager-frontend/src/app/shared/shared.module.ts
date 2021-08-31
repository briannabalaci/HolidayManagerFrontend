import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { EventEntity } from './data-types/event';
import { EventService } from './services/event.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RoleGuardService } from './services/role-guard.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { QuestionControlService } from './services/question-control.service';
import { EnvService } from './services/env.service';
import { EventGuardService } from './services/event-guard.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule
  ],
  providers: [
    UserService,
    LoginService,
    EventService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    RoleGuardService,
    AuthService,
    AuthGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    QuestionControlService,
    EnvService,
    EventGuardService
  ]
})
export class SharedModule { }

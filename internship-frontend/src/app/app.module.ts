import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeedashComponent } from './employee/employeedash/employeedash.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { RegisterFormComponent } from './landing/register-panel/register-form/register-form.component';
import { RegisterPanelModule } from './landing/register-panel/register-panel.module';
import { RegisterPanelComponent } from './landing/register-panel/register-panel.component';
import { LoginFormComponent } from './landing/login-panel/login-form/login-form.component';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamsTableComponent } from './team-management/teams-table/teams-table.component';
import { CreateTeamComponent } from './team-management/create-team/create-team.component';
import {MatListModule} from "@angular/material/list";
import { TeamleadHomeComponent } from './home/teamlead-home/teamlead-home.component';
import {TeamleadHomeModule} from "./home/teamlead-home/teamlead-home.module";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoginResetFormComponent } from './landing/login-panel/login-reset-form/login-reset-form.component';
import {MatCardModule} from '@angular/material/card';
import { AuthentificationInterceptor } from './service/authentification.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UserSearchBarComponent } from './team-management/create-team/user-search-bar/user-search-bar.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { TeamleadPickerComponent } from './team-management/create-team/teamlead-picker/teamlead-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeedashComponent,
    LoginPanelComponent,
    LoginFormComponent,
    LoginResetFormComponent,
    RegisterPanelComponent,
    RegisterFormComponent,
    LoginFormComponent,
    TeamManagementComponent,
    TeamsTableComponent,
    CreateTeamComponent,
    TeamleadHomeComponent,
    LoginFormComponent,
    AdminComponent,
    UserSearchBarComponent,
    TeamleadPickerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    RegisterPanelModule,
    LoginPanelModule,
    HttpClientModule,
    MatListModule,
    TeamleadHomeModule,
    MatCardModule,
    NgxMatSelectSearchModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

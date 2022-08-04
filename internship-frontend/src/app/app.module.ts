import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeedashComponent } from './employee/employeedash/employeedash.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { CreateUserComponent } from './admin/create-user/create-user.component';
import { CreateUserFormComponent } from './admin/create-user/create-user-form/create-user-form.component';
import { DropDownComponent } from './admin/create-user/create-user-form/drop-down/drop-down.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserTableComponent } from './admin/user-list/user-table/user-table.component';
import { AdminComponent } from './admin/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeedashComponent,
    LoginPanelComponent,
    RegisterPanelComponent,
    RegisterFormComponent,
<<<<<<< HEAD
    CreateUserComponent,
    CreateUserFormComponent,
    DropDownComponent,
    UserListComponent,
    UserTableComponent,
    AdminComponent
=======
    LoginFormComponent

>>>>>>> development
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

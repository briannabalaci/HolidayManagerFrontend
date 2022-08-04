import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

import { LoginFormComponent } from './landing/login-panel/login-form/login-form.component';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';

import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { CreateUserComponent } from './admin/admin-page/create-user/create-user.component';
import { CreateUserFormComponent } from './admin/admin-page/create-user/create-user-form/create-user-form.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    LoginFormComponent,
    AdminPageComponent,
    CreateUserComponent,
    CreateUserFormComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    LoginPanelModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

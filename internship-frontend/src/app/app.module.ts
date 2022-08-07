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

import { LoginFormComponent } from './landing/login-panel/login-form/login-form.component';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';



import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { CreateUserComponent } from './admin/admin-page/create-user/create-user.component';
import { CreateUserFormComponent } from './admin/admin-page/create-user/create-user-form/create-user-form.component';
import { UserListComponent } from './admin/admin-page/user-list/user-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';






import { TeamleadHomeComponent } from './home/teamlead-home/teamlead-home.component';
import {TeamleadHomeModule} from "./home/teamlead-home/teamlead-home.module";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoginResetFormComponent } from './landing/login-panel/login-reset-form/login-reset-form.component';
import {MatCardModule} from '@angular/material/card';
import { AuthentificationInterceptor } from './service/authentification.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  
    AdminPageComponent,
    CreateUserComponent,
    CreateUserFormComponent,
    UserListComponent,

   

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
    HttpClientModule,
    MatPaginatorModule,
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

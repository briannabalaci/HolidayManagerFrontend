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

import { LoginPanelModule } from './landing/login-panel/login-panel.module';




import { MatPaginatorModule } from '@angular/material/paginator';








import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthentificationInterceptor } from './service/authentification.interceptor';


import { MatListModule } from '@angular/material/list';
import { TeamleadHomeModule } from './home/teamlead-home/teamlead-home.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,

  

    

    

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
    
    LoginPanelModule,
    MatListModule,
    TeamleadHomeModule,
    MatCardModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

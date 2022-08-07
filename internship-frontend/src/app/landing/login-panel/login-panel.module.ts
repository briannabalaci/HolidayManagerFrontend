import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { LoginPanelComponent } from './login-panel.component';
import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {
    path: 'login', component: LoginPanelComponent
 }
]
@NgModule({
  declarations: [
    LoginFormComponent
    
  ],
  imports: [
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    LoginFormComponent
  ],
  providers: [],
})
export class LoginPanelModule { }

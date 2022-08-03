import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { EmployeedashComponent } from './employeedash.component';
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'employee', component: EmployeedashComponent
 }
]
@NgModule({
  declarations: [
  ],
  imports: [
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [],
})
export class LoginPanelModule { }

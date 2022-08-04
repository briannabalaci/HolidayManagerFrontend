import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


import { Routes } from '@angular/router';
import { RegisterPanelComponent } from './register-panel.component';
const routes: Routes = [
  {
    path: 'register', component: RegisterPanelComponent
 }
]
@NgModule({
  declarations: [
    RegisterPanelComponent
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
export class RegisterPanelModule { }

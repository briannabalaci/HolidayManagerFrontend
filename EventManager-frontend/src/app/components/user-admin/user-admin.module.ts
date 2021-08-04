import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin.component';
import { UserAdminFormComponent } from './user-admin-form/user-admin-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UserAdminComponent
  }
]

@NgModule({
  declarations: [UserAdminComponent,
  UserAdminFormComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    UserAdminComponent,
    UserAdminFormComponent
  ]
})
export class UserAdminModule { }


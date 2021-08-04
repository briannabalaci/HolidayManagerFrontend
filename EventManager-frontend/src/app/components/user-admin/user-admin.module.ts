import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin.component';

const routes: Routes = [
  {
    path: '',
    component: UserAdminComponent
  }
]

@NgModule({
  declarations: [UserAdminComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UserAdminModule { }


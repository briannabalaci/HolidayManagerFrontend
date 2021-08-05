import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './main.component';
import { LoginComponent } from '../login/login.component';


import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from 'src/app/components/login/login.module';
import { DashboardModule } from 'src/app/components/dashboard/dashboard.module';
import { UserAdminModule } from 'src/app/components/user-admin/user-admin.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatLabel } from '@angular/material/form-field';
import { MessageModule } from '../message/message.module';
import { MatPaginator } from '@angular/material/paginator';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
]

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    LoginModule,
    DashboardModule,
    UserAdminModule,
    MatTableModule,
    MatFormFieldModule,
    MessageModule,
    //MatPaginator
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from 'src/app/components/login/login.module';
import { DashboardModule } from 'src/app/components/dashboard/dashboard.module';
import { UserAdminModule } from 'src/app/components/user-admin/user-admin.module';

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
    UserAdminModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';

import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
 
  { path: 'login', component: LoginPanelComponent },
  { path: 'createuser', component: CreateUserComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

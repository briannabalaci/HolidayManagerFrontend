import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';
import { RegisterPanelModule } from './landing/register-panel/register-panel.module';
import { RegisterPanelComponent } from './landing/register-panel/register-panel.component';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import {TeamleadHomeComponent} from "./home/teamlead-home/teamlead-home.component";
import { EmployeedashComponent } from './employee/employeedash/employeedash.component';
import {TeamManagementComponent} from "./team-management/team-management.component";
/*
const routes: Routes = [
  {path: 'register', loadChildren: () => import('./landing/register-panel/register-panel.module').then(n => RegisterPanelModule)},
  {path: 'login', loadChildren: () => import('./landing/login-panel/login-panel.module').then(n => LoginPanelModule)},
  {path: 'login', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', redirectTo: 'register', pathMatch: 'full'},
  {path: '', redirectTo: 'register', pathMatch: 'full'}
];
*/
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component: RegisterPanelComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'employee', component: EmployeedashComponent },
  { path: 'team-management', component: TeamManagementComponent },
  { path: 'teamlead-home', component: TeamleadHomeComponent},
  { path: 'employee', component: EmployeedashComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

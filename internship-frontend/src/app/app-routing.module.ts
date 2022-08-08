import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';
import { RegisterPanelModule } from './landing/register-panel/register-panel.module';
import { RegisterPanelComponent } from './landing/register-panel/register-panel.component';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import {TeamleadHomeComponent} from "./home/teamlead-home/teamlead-home.component";
import { EmployeedashComponent } from './employee/employeedash/employeedash.component';
import {TeamManagementComponent} from "./team-management/team-management.component";
import {AuthguardService} from "./authguards/authguard.service";
import {AdminComponent} from "./admin/admin.component";
import {AuthguardAdminService} from "./authguards/authguard-admin.service";
import { AuthguardTeamleadService } from './authguards/authguard-teamlead.service';
import { AuthguardEmployeeService } from './authguards/authguard-employee.service';
import { AuthguardLoginService } from './authguards/authguard-login.service';
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
  // Add AuthguardLoginService when we have a logout function.
  { path: 'login', component: LoginPanelComponent , canActivate: [AuthguardLoginService] },
  { path: 'employee', component: EmployeedashComponent, canActivate:[AuthguardService, AuthguardEmployeeService] },
  { path: 'team-management', component: TeamManagementComponent, canActivate:[AuthguardService, AuthguardAdminService] },
  { path: 'teamlead', component: TeamleadHomeComponent, canActivate:[AuthguardService, AuthguardTeamleadService]},
  { path: 'admin', component: AdminComponent, canActivate:[AuthguardService,AuthguardAdminService] },
  { path: "**",redirectTo:"login"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

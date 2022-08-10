import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import {TeamleadHomeComponent} from "./home/teamlead-home/teamlead-home.component";
import { EmployeedashComponent } from './employee/employeedash/employeedash.component';
import {TeamManagementComponent} from "./team-management/team-management.component";
import {AuthguardService} from "./authguards/authguard.service";
import {AdminComponent} from "./admin/admin.component";
import {AuthguardAdminService} from "./authguards/authguard-admin.service";

import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AuthguardTeamleadService } from './authguards/authguard-teamlead.service';
import { AuthguardEmployeeService } from './authguards/authguard-employee.service';
import { AuthguardLoginService } from './authguards/authguard-login.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  { path: 'admin', component: AdminComponent, canActivate:[AuthguardService,AuthguardAdminService] },
  { path: 'user-panel', component: AdminPageComponent, canActivate:[AuthguardService,AuthguardAdminService] },
  { path: 'login', component: LoginPanelComponent , canActivate: [AuthguardLoginService] },
  { path: 'employee', component: EmployeedashComponent, canActivate:[AuthguardService, AuthguardEmployeeService] },
  { path: 'team-management', component: TeamManagementComponent, canActivate:[AuthguardService, AuthguardAdminService] },
  { path: 'teamlead', component: TeamleadHomeComponent, canActivate:[AuthguardService, AuthguardTeamleadService]},
  { path: "**",redirectTo:"login"}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

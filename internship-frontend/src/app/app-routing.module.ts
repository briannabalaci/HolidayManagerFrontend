import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';

import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';





const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
 
  { path: 'login', component: LoginPanelComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'admin', component: AdminPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

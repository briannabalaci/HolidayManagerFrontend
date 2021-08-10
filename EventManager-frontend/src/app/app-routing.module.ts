import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {

    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'user-admin',
    loadChildren: () => import('./components/user-admin/user-admin.module').then(m => m.UserAdminModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./components/event/event.module').then(m => m.EventModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./components/change-password/change-password.module').then(m => m.ChangePasswordModule)
  },
  {
    path: '**',
    redirectTo: 'login'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

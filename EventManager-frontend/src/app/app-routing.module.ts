import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ignoreElements } from 'rxjs/operators';
import { RoleGuardService } from './shared/services/role-guard.service';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {

    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [RoleGuardService], 
    data: {
      expectedRole: ['ORGANIZER','ATTENDEE']
    }
  },
  {
    path: 'user-admin',
    loadChildren: () => import('./components/user-admin/user-admin.module').then(m => m.UserAdminModule),
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: ['ADMIN']
    } 
  },
  {
    path: 'event',
    loadChildren: () => import('./components/event/event.module').then(m => m.EventModule),
    canActivate: [RoleGuardService], 
    data: {
      expectedRole: ['ORGANIZER','ATTENDEE']
    }
  },
  {
    path: 'change-password',
    loadChildren: () => import('./components/change-password/change-password.module').then(m => m.ChangePasswordModule),
    canActivate: [RoleGuardService], 
    data: {
      expectedRole: ['ORGANIZER','ATTENDEE', 'ADMIN']
    }
  },
  {
    path: '**',
    redirectTo: 'login'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

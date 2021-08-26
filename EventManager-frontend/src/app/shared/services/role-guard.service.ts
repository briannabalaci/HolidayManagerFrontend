import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthGuardService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.auth.canActivate()) {
      const expectedRole = route.data.expectedRole;
  
      const token: any = jwt_decode(sessionStorage.getItem('token') || '');
  
      console.log(token.roles[0]);

      if(!expectedRole.includes(token.roles[0]))
      {
        this.router.navigateByUrl('/login');
        return false;
      }
      
      return true;
    }
    else {
      //if link smth like event/id redirect to login/goToEvent?=id
      const url = state.url;
      console.log(state.url)
      this.router.navigate(['/login'], {queryParams: {redirectTo: url}})
      return false;
    }

  }
}

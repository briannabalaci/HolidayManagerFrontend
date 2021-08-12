import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
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
}

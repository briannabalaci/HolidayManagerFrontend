import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {parseJwt} from "../utils/JWTParser";
import {UserType} from "../shared/data-type/User";

@Injectable({
  providedIn: 'root'
})
export class AuthguardLoginService  implements CanActivate {
  constructor(private cookieService: CookieService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get("Token")
    if(!token) {
      return true;
    } else {
      const role = parseJwt(token).type;
      if (role == UserType.ADMIN) {
        this.router.navigate(["../admin"]);
      }  else if (role == UserType.EMPLOYEE) {
        this.router.navigate(["../employee"]);
      }  else if (role == UserType.TEAMLEAD) {
        this.router.navigate(["../teamlead"]);
      }            
    }
    return false;
  }
}
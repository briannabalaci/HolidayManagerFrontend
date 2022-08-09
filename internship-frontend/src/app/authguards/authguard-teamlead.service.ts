import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {parseJwt} from "../utils/JWTParser";
import {UserType} from "../shared/data-type/User";

@Injectable({
  providedIn: 'root'
})
export class AuthguardTeamleadService implements CanActivate {
  constructor(private cookieService: CookieService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get("Token")
    const role = parseJwt(token).type;
    if(role === UserType.TEAMLEAD){
      console.log("TEAMLEAD")
      return true;
    }
    else if(role === UserType.EMPLOYEE){
      this.router.navigate(["../employee"]);
    } else if(role === UserType.ADMIN){
      this.router.navigate(["../admin"]);
    }

    return false;
  }
}

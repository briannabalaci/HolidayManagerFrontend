import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {parseJwt} from "../utils/JWTParser";
import {UserType} from "../shared/data-type/User";

@Injectable({
  providedIn: 'root'
})
export class AuthguardAdminService implements CanActivate{

  constructor(private cookieService: CookieService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get("Token")
    if(parseJwt(token).type === UserType.ADMIN){
      console.log("ADMIN")
      return true
    }
    else{
      this.router.navigate(["../login"])
    }

    return false;
  }
}

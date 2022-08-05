import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Headers are set");
    if (!request.url.includes("/auth")) {
      const jwt = this.cookieService.get("Token");
      const headers: any = {"app-auth": jwt};
      request = request.clone({setHeaders: headers});
  }
   return next.handle(request);
  }
}

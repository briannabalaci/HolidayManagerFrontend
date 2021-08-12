import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }


  public isAuthenticated(): boolean() {
    const token = sessionStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}

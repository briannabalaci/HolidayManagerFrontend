import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data-types/user';




@Injectable()


export class LoginService {

  private ENVIRONMENT = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  checkUser(user: User) : void {
    const url = `${this.ENVIRONMENT}/users/login`;

    this.httpClient.post(url,user).subscribe(data => {
      console.log(data);
    })



  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../data-types/user';
import { Observable } from 'rxjs';




@Injectable()


export class LoginService {

  private ENVIRONMENT = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  checkUser(user: User) : Observable<string> {
    const url = `${this.ENVIRONMENT}/users/login`;

  

    return this.httpClient.post(url,user,{responseType: 'text'});



  }
}

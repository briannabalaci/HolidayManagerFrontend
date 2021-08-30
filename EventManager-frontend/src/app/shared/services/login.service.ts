import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../data-types/user';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';




@Injectable()


export class LoginService {

  private ENVIRONMENT: string;

  constructor(private httpClient: HttpClient, private environment: EnvService) {
    this.ENVIRONMENT = environment.getEnvironment();
   }

  checkUser(user: User) : Observable<string> {
    const url = `${this.ENVIRONMENT}/users/login`;

  

    return this.httpClient.post(url,user,{responseType: 'text'});



  }
}

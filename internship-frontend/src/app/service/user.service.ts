import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLoginData} from "../shared/data-type/UserLoginData";
import {User} from "../shared/data-type/User";

const LOGIN = "http://localhost:8090/user/login"


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public login(loginData: UserLoginData): Observable<User>{
    return this.httpClient.post<User>(LOGIN,loginData);
  }
}

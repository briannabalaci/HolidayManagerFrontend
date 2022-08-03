import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const LOGIN = "http://localhost:8090/user/login"

export class UserLoginData{
  email?:string;
  password?:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public login(loginData: UserLoginData): Observable<String>{
    console.log("Aici in service")
    return this.httpClient.post<String>(LOGIN,loginData);
  }
}

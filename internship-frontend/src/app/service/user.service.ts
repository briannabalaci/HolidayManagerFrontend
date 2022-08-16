import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLoginData} from "../shared/data-type/UserLoginData";
import {User} from "../shared/data-type/User";

const URL_BASE = "http://localhost:8090/user"
const LOGIN = "http://localhost:8090/login/auth"
const GET_ALL_USERS = URL_BASE + "/get-all-users"
const GET_ALL_USERS_WITHOUT_TEAM = URL_BASE + "/users-noteam"
const FILTER_USERS_BY_NAME = URL_BASE + "/filter-name"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public login(loginData: UserLoginData): Observable<any>{
    return this.httpClient.post<any>(LOGIN,loginData);
  }

  public getAll(): Observable<User[]> {
      return this.httpClient.get<User[]>(GET_ALL_USERS);
  }

  public getAllUsersWithoutTeam(): Observable<User[]> {
      return this.httpClient.get<User[]>(GET_ALL_USERS_WITHOUT_TEAM);
  }

  public filterUsersByName(name: String): Observable<User[]> {
    if (name !== '') {
      return this.httpClient.get<User[]>(FILTER_USERS_BY_NAME);
    } else {
      return this.httpClient.get<User[]>(GET_ALL_USERS);
    }
  }



}

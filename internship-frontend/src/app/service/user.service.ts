import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLoginData} from "../shared/data-type/UserLoginData";
import {User} from "../shared/data-type/User";

const LOGIN = "http://localhost:8090/login/auth"
const GET_USERS_FROM_TEAM = "http://localhost:8090/team/users"
const GET_ALL_USERS = "http://localhost:8090/user/get-all-users"
const GET_ALL_USERS_WITHOUT_TEAM = "http://localhost:8090/user/get-users-noteam"
const FILTER_USERS_BY_NAME = "http://localhost:8090/user/filter-name"

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

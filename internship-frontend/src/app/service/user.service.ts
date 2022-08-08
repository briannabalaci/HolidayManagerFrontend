import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from '../shared/data-type/User';
import { UserLoginData } from '../shared/data-type/UserLoginData';


const LOGIN = "http://localhost:8090/user/login"
import {Department, Role,  UserType} from "../shared/data-type/User";
import {Team} from "../shared/data-type/Team";

const GET_USERS_FROM_TEAM = "http://localhost:8090/team/users"
const GET_ALL_USERS = "http://localhost:8090/user/get-all"
const FILTER_USERS_BY_NAME = "http://localhost:8090/user/filter-name"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public login(loginData: UserLoginData): Observable<any>{
    return this.httpClient.post<any>(LOGIN,loginData);
  }

  public getAllUsersByTeam(teamID: number): Observable<User[]> {
      return this.httpClient.get<User[]>(GET_ALL_USERS);
  }

  public filterUsersByName(name: String): Observable<User[]> {
    if (name !== '') {
      return this.httpClient.get<User[]>(FILTER_USERS_BY_NAME);
    } else {
      return this.httpClient.get<User[]>(GET_ALL_USERS);
    }
  }


}

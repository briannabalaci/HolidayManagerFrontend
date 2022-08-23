import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLoginData} from "../shared/data-type/UserLoginData";
import {User, UserName} from "../shared/data-type/User";
import {parseJwt} from "../utils/JWTParser";
import {CookieService} from "ngx-cookie-service";

const URL_BASE = "http://localhost:8090/user"
const LOGIN = "http://localhost:8090/login/auth"
const GET_ALL_USERS = URL_BASE + "/get-all-users"
const GET_ALL_USERS_WITHOUT_TEAM = URL_BASE + "/users-noteam"
const GET_USER = `${URL_BASE}/user-info`
const GET_USER_BY_ID = URL_BASE + "/find-user-by-id"
const FILTER_BY_NAME = URL_BASE + "/filter-by-name"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  public login(loginData: UserLoginData): Observable<any>{
    return this.httpClient.post<any>(LOGIN,loginData);
  }

  public getUser(): Observable<User> {
    let url = `${GET_USER}?email=${parseJwt(this.cookieService.get("Token")).username}`
    return this.httpClient.get(url)
  }

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(GET_ALL_USERS);
  }

  public getAllUsersWithoutTeam(): Observable<User[]> {
    return this.httpClient.get<User[]>(GET_ALL_USERS_WITHOUT_TEAM);
  }

  public getUserById(id:number): Observable<User>{
    return this.httpClient.get<User>(GET_USER_BY_ID+"/"+id.toString());
  }

  public filterByName(data:UserName):Observable<User[]>{
      return this.httpClient.get<User[]>(FILTER_BY_NAME);
  }

}

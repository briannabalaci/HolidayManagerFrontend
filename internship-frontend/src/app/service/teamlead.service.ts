import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/data-type/User";
import {CookieService} from "ngx-cookie-service";
import {parseJwt} from "../utils/JWTParser";
import {Holiday} from "../shared/data-type/Holiday";

const GET_USER = "http://localhost:8090/teamlead/get-user?email=";
const GET_REQUESTS = "http://localhost:8090/teamlead/get-requests?id=";
const GET_TEAM_REQUESTS = "http://localhost:8090/teamlead/get-team-requests?id=";

@Injectable({
  providedIn: 'root'
})
export class TeamleadService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  public getUser(): Observable<User> {
    let url = `${GET_USER}${parseJwt(this.cookieService.get("Token")).username}`
    return this.httpClient.get(url)
  }

  public getTeamLeadsRequests(id: number): Observable<Holiday[]>{
    let url = `${GET_REQUESTS}${id}`
    return this.httpClient.get<Holiday[]>(url);
  }

  public getTeamRequests(id: number): Observable<Holiday[]>{
    let url = `${GET_TEAM_REQUESTS}${id}`
    return this.httpClient.get<Holiday[]>(url);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/data-type/User";
import {CookieService} from "ngx-cookie-service";
import {parseJwt} from "../utils/JWTParser";
import {HolidayDto, HolidayTypeDto} from "../shared/data-type/HolidayDto";

const URL = "http://localhost:8090/teamlead/";

const GET_USER = `${URL}user?email=`;
const GET_REQUESTS = `${URL}requests?id=`;
const GET_TEAM_REQUESTS = `${URL}team-requests?id=`;
const GET_REQUESTS_FILTERED = `${URL}requests-filtered-by`;

@Injectable({
  providedIn: 'root'
})
export class TeamleadService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  public getUser(): Observable<User> {
    let url = `${GET_USER}${parseJwt(this.cookieService.get("Token")).username}`
    return this.httpClient.get(url)
  }

  public getTeamLeadsRequests(id: number): Observable<HolidayDto[]>{
    let url = `${GET_REQUESTS}${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public getTeamRequests(id: number): Observable<HolidayDto[]>{
    let url = `${GET_TEAM_REQUESTS}${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public getRequestsFilteredByType(type: HolidayTypeDto, id: number): Observable<HolidayDto[]>{
    let url = `${GET_REQUESTS_FILTERED}?type=${type}&id=${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

}

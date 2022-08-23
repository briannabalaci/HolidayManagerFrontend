import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../shared/data-type/User";
import {CookieService} from "ngx-cookie-service";
import {parseJwt} from "../utils/JWTParser";
import {HolidayDto, HolidayTypeDto} from "../shared/data-type/HolidayDto";

const URL = "http://localhost:8090/teamlead/";

const DECLINE_REQUEST = `http://localhost:8090/holiday/deny`
const APPROVE_REQUEST = `http://localhost:8090/holiday/approve`
const MORE_DETAILS = `http://localhost:8090/holiday/details`
const GET_REQUESTS = `${URL}requests?id=`;
const GET_TEAM_REQUESTS = `${URL}team-requests?id=`;
const GET_PDF = `http://localhost:8090/teamlead/getPDF?id=`;
@Injectable({
  providedIn: 'root'
})
export class TeamleadService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  public getTeamLeadsRequests(id: number): Observable<HolidayDto[]>{
    let url = `${GET_REQUESTS}${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public getTeamRequests(id: number): Observable<HolidayDto[]>{
    let url = `${GET_TEAM_REQUESTS}${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public declineRequest(id: number): Observable<HolidayDto>{
    let url = `${DECLINE_REQUEST}/${id}`
    return this.httpClient.put<HolidayDto>(url, new Headers({'Content-Length': '0'}));
  }

  public approveRequest(id: number): Observable<HolidayDto>{
    let url = `${APPROVE_REQUEST}/${id}`
    return this.httpClient.put<HolidayDto>(url, new Headers({'Content-Length': '0'}));
  }

  public moreDetailsRequest(id: number, message: string): Observable<HolidayDto>{
    return this.httpClient.put<HolidayDto>(MORE_DETAILS, {
      id: id,
      details: message
    })
  }
  public getPDF(id: number): Observable<Blob> {
    let url = GET_PDF + id;
    return this.httpClient.get(url, {
      responseType: 'blob'
    });
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holiday } from '../shared/data-type/Holiday';
import { User } from '../shared/data-type/User';
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../shared/data-type/HolidayDto";

const GET_USERS_HOLIDAYS = "http://localhost:8090/holiday/get-users-holidays"
const CREATE_HOLIDAY = "http://localhost:8090/holiday/add-holiday"
const URL = "http://localhost:8090/holiday";
const GET_REQUESTS_FILTERED = `${URL}/requests-filtered-by`;

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private httpClient: HttpClient) { }

  public getAllHolidaysById(id: number): Observable<Holiday[]> {
    return this.httpClient.get<Holiday[]>(GET_USERS_HOLIDAYS+'/'+id.toString());
  }
  public createHoliday(holiday: Holiday): Observable<Holiday>{
    return this.httpClient.post<Holiday>(CREATE_HOLIDAY, holiday);
  }

  public getRequestsFilteredByType(type: HolidayTypeDto, id: number): Observable<HolidayDto[]>{
    let url = `${GET_REQUESTS_FILTERED}?type=${type}&id=${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public getRequestsFilteredByStatus(status: HolidayStatusDto, id: number): Observable<HolidayDto[]>{
    let url = `${GET_REQUESTS_FILTERED}?status=${status}&id=${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public getRequestsFilteredByStatusAndType(status: HolidayStatusDto, type: HolidayTypeDto, id: number): Observable<HolidayDto[]>{
    let url = `${GET_REQUESTS_FILTERED}?status=${status}&type=${type}&id=${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

}

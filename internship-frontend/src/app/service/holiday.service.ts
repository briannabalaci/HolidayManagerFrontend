import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holiday } from '../shared/data-type/Holiday';
import { User } from '../shared/data-type/User';
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../shared/data-type/HolidayDto";

const URL = "http://localhost:8090/holiday";

const UPDATE_HOLIDAY = `${URL}/update-holiday`
const GET_REQUESTS_FILTERED = `${URL}/requests-filtered-by`;
const GET_USERS_HOLIDAYS = `${URL}/get-users-holidays`
const CREATE_HOLIDAY = `${URL}/add-holiday`
const DELETE_HOLIDAY =`${URL}/delete-holiday`
const GET_NO_HOLIDAYS_REQUIRED = `${URL}/number-of-holidays`
const GET_HOLIDAY = `${URL}/holiday-info`

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

  public deleteHoliday(id?: number): Observable<Holiday> {
    console.log(DELETE_HOLIDAY + '/' + id?.toString())
    return this.httpClient.delete<Holiday>(DELETE_HOLIDAY + '/' + id?.toString());
  }


  public updateHoliday(holiday: Holiday): Observable<Holiday>{
    return this.httpClient.put<Holiday>(UPDATE_HOLIDAY, holiday);
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

  public getNoHolidays(startDate: string, endDate: string): Observable<number>{
    let url =`${GET_NO_HOLIDAYS_REQUIRED}?startDate=${startDate}&endDate=${endDate}`
    return this.httpClient.get<number>(url)
  }

  public getHoliday(id: number): Observable<HolidayDto>{
    let url = `${GET_HOLIDAY}?id=${id}`
    return this.httpClient.get<HolidayDto>(url)
  }


}

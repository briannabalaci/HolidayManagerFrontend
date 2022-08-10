import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holiday } from '../shared/data-type/Holiday';
import { User } from '../shared/data-type/User';

const GET_USERS_HOLIDAYS = "http://localhost:8090/holiday/get-users-holidays"
const CREATE_HOLIDAY = "http://localhost:8090/holiday/add-holiday"

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private httpClient: HttpClient) { }

  public getAllHolidaysById(id: number): Observable<Holiday[]> {

    return this.httpClient.get<Holiday[]>(GET_USERS_HOLIDAYS+'/'+id.toString());
}
}

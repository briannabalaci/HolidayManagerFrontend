import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Holiday} from '../shared/data-type/Holiday';
import {User} from '../shared/data-type/User';
import {HolidayDto, HolidayStatusDto, HolidayTypeDto, HolidayTypeUserName} from "../shared/data-type/HolidayDto";
import {parseJwt} from "../utils/JWTParser";
import {CookieService} from "ngx-cookie-service";

// const URL_BASE = "http://localhost:8090/holiday"
const URL_BASE = "http://Runtimeterrorinternshipapp-env.eba-exhqmhri.us-east-1.elasticbeanstalk.com/holiday"

const GET_USERS_HOLIDAYS = URL_BASE + "/get-users-holidays"
const CREATE_HOLIDAY = URL_BASE + "/add-holiday"

const DELETE_HOLIDAY = URL_BASE + "/delete-holiday"
const CHECK_REQUEST_CREATE = `${URL_BASE}/check-request-create`
const CHECK_REQUEST_UPDATE = `${URL_BASE}/check-request-update`
const CHECK_DATE_OVERLAP = `${URL_BASE}/check-date-overlap`
const CHECK_DATE_OVERLAP_UPDATE = `${URL_BASE}/check-date-overlap-update`

const UPDATE_HOLIDAY = URL_BASE + "/update-holiday"
const GET_REQUESTS_FILTERED = `${URL_BASE}/requests-filtered-by`;

const GET_NO_HOLIDAYS_REQUIRED = URL_BASE + "/number-of-holidays"
const REQUEST_DETAILS = URL_BASE + "/details"

const GET_HOLIDAY = `${URL_BASE}/holiday-info`
const FILTER = URL_BASE + "/filter"

const GET_SUBSTITUTE_REQUESTS = `${URL_BASE}/substitute-requests`

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  public getAllHolidaysById(id: number): Observable<Holiday[]> {
    return this.httpClient.get<Holiday[]>(GET_USERS_HOLIDAYS + '/' + id.toString());
  }

  public createHoliday(holiday: Holiday, substituteId: number): Observable<Holiday> {
    let url = `${CREATE_HOLIDAY}?substituteId=${substituteId}`
    return this.httpClient.post<Holiday>(url, holiday);
  }

  public deleteHoliday(id?: number): Observable<Holiday> {
    console.log(DELETE_HOLIDAY + '/' + id?.toString())
    return this.httpClient.delete<Holiday>(DELETE_HOLIDAY + '/' + id?.toString());
  }


  public updateHoliday(holiday: Holiday, substituteId:number): Observable<Holiday> {
    let url = `${UPDATE_HOLIDAY}?substituteId=${substituteId}`
    return this.httpClient.put<Holiday>(url, holiday);
  }

  public getRequestsFilteredByType(type: HolidayTypeDto, id: number): Observable<HolidayDto[]> {
    let url = `${GET_REQUESTS_FILTERED}?type=${type}&id=${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public getRequestsFilteredByStatus(status: HolidayStatusDto, id: number): Observable<HolidayDto[]> {
    let url = `${GET_REQUESTS_FILTERED}?status=${status}&id=${id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }

  public getRequestsFilteredByStatusAndType(status: HolidayStatusDto, type: HolidayTypeDto, id: number): Observable<HolidayDto[]> {
    let url = `${GET_REQUESTS_FILTERED}?status=${status}&type=${type}&id=${id}`
    return this.httpClient.get<HolidayDto[]>(url);

  }

  public getNoHolidays(startDate: string, endDate: string): Observable<number> {
    let url = `${GET_NO_HOLIDAYS_REQUIRED}?startDate=${startDate}&endDate=${endDate}`
    return this.httpClient.get<number>(url)
  }

  public getHoliday(id: number): Observable<HolidayDto> {
    let url = `${GET_HOLIDAY}?id=${id}`
    return this.httpClient.get<HolidayDto>(url)
  }


  checkAndCreateRequest(username: string, holidayType: HolidayTypeDto, startDate: string, endDate: string): Observable<number> {
    let url = `${CHECK_REQUEST_CREATE}?email=${username}&type=${holidayType}&startDate=${startDate}&endDate=${endDate}`;
    return this.httpClient.get<number>(url);
  }

  checkAndUpdateRequest(username: string, holidayType: HolidayTypeDto, startDate: string, endDate: string, holidayId: number): Observable<number> {
    let url = `${CHECK_REQUEST_UPDATE}?email=${username}&type=${holidayType}&startDate=${startDate}&endDate=${endDate}&holidayId=${holidayId}`;
    return this.httpClient.get<number>(url);
  }

  checkDateOverlap(username: string, startDate: string, endDate: string): Observable<number> {
    let url = `${CHECK_DATE_OVERLAP}?email=${username}&startDate=${startDate}&endDate=${endDate}`;
    return this.httpClient.get<number>(url);
  }

  checkDateOverlapUpdate(username: string, startDate: string, endDate: string, holidayId: number): Observable<number> {
    let url = `${CHECK_DATE_OVERLAP_UPDATE}?email=${username}&startDate=${startDate}&endDate=${endDate}&holidayId=${holidayId}`;
    return this.httpClient.get<number>(url);
  }

  public filterByTypeAndUserName(data: HolidayTypeUserName): Observable<HolidayDto[]> {
    if (data.type == null && data.forname != null && data.surname != null)
      return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}&forname=${data.forname}&surname=${data.surname}`);
    else if (data.type == null && data.forname == null && data.surname != null)
      return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}&surname=${data.surname}`);
    else if (data.type == null && data.forname != null && data.surname == null)
      return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}&forname=${data.forname}`);
    else if (data.type != null && data.forname == null && data.surname == null)
      return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}&type=${data.type}`);
    else if (data.type != null && data.forname != null && data.surname == null)
      return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}&type=${data.type}&forname=${data.forname}`);
    else if (data.type != null && data.forname == null && data.surname != null)
      return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}&type=${data.type}&surname=${data.surname}`);
    else if (data.type != null && data.forname != null && data.surname != null)
      return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}&type=${data.type}&forname=${data.forname}&surname=${data.surname}`);
    else return this.httpClient.get<HolidayDto[]>(`${FILTER}?teamLeaderId=${data.teamLeaderId}`);

  }
  public getSubstituteRequests(): Observable<HolidayDto[]> {
    let url = `${GET_SUBSTITUTE_REQUESTS}?id=${parseJwt(this.cookieService.get("Token")).id}`
    return this.httpClient.get<HolidayDto[]>(url);
  }
}

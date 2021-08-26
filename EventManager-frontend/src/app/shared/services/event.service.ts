import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEntity } from '../data-types/event';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable(

)
export class EventService {


  private ENVIRONMENT = "https://service-tr.feedback-internship.de/event";

  constructor(private httpClient: HttpClient) { }

  createEvent(event: EventEntity) : Observable<any> {
    const path = `${this.ENVIRONMENT}/addEvent`;
    return this.httpClient.post<any>(path, event);
  }

  getEvents() : Observable<EventEntity[]> {
    const path = `${this.ENVIRONMENT}/getAll`

    return this.httpClient.get<EventEntity[]>(path);
  }

  
  getEventsByUserIdAndFilter(email: string, filter:string) : Observable<EventEntity[]> {
    const path = `${this.ENVIRONMENT}/getAllBy`;

    let httpParams = new HttpParams().append("email",email).append("filter",filter);

    return  this.httpClient.get<EventEntity[]>(path,{params:httpParams});
  }

  getEvent(id: number) : Observable<EventEntity> {
    const path = `${this.ENVIRONMENT}/${id}`;

    return this.httpClient.get<EventEntity>(path);
  }

  deleteEvent(id: number): Observable<any> {
    const path = `${this.ENVIRONMENT}/deleteEvent/${id}`;

    return this.httpClient.delete<EventEntity>(path);
  }

  updateEvent(event: EventEntity): Observable<any> {
    const path = `${this.ENVIRONMENT}/updateEvent`;

    console.log(event);

    return this.httpClient.put<any>(path,event);
  }

  getGeneratedPdf(eventId: number, filter: string) {
    const path = `${this.ENVIRONMENT}/${eventId}/statistics/${filter}`;
    let  headers= new HttpHeaders({
      'Content-Type':  'application/pdf',
      responseType : 'blob',
      Accept : 'application/pdf',
      observe : 'response'
      })
    return this.httpClient.get(path, {
      headers:headers, responseType : 'blob',
  });
  }
}

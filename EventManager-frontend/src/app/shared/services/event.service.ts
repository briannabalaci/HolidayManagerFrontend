import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEntity } from '../data-types/event';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable(

)
export class EventService {


  private ENVIRONMENT = "http://localhost:8080/event";

  constructor(private httpClient: HttpClient) { }

  createEvent(event: EventEntity) : void {
    const path = `${this.ENVIRONMENT}/addEvent`;
    console.log(event);



    this.httpClient.post<any>(path, event).subscribe(data => {},
      err => {console.log(err)});
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
}

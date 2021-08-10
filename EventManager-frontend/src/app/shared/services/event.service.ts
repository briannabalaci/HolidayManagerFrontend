import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEntity } from '../data-types/event';

@Injectable(

)
export class EventService {


  private ENVIRONMENT = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  createEvent(event: EventEntity) : void {
    const path = `${this.ENVIRONMENT}/event/addEvent`;
    console.log(event);
    this.httpClient.post<EventEntity>(path, event).subscribe(data => {},
      err => {console.log(err)});
  }
}

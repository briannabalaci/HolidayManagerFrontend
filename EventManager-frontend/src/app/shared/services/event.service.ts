import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEntity } from '../data-types/event';

@Injectable(

)
export class EventService {


  private ENVIRONMENT = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  createEvent(event: EventEntity,file: File) : void {
    const path = `${this.ENVIRONMENT}/event/addEvent`;
    console.log(event);


    const formData = new FormData();

    formData.append('eventDto', new Blob([JSON.stringify(event)], {type: 'application/json'}));

    formData.append('file',file);

    this.httpClient.post<any>(path, formData).subscribe(data => {},
      err => {console.log(err)});
  }
}

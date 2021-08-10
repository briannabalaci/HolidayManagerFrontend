import { Injectable } from '@angular/core';
import { EventEntity } from '../data-types/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  createEvent(event: EventEntity) : void {
      console.log(event);
  }
}

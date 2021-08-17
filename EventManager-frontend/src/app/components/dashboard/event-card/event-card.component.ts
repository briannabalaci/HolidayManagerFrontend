import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEntity } from '../../../shared/data-types/event';
import { EventService } from '../../../shared/services/event.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  imageUrl: any;
  status: string = '';
  date: string = '';
  // coverImg = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  @Input() event?: EventEntity;

  constructor(private eventService: EventService, private domSanitizer: DomSanitizer) { }

  imgUrl : any;

  ngOnInit(): void {

    const currentDate = new Date();
    const eventDate = new Date(this.event?.eventDate!);

    if (eventDate.getDate() < currentDate.getDate())
      this.date = eventDate.getDate().toString();
    else
    {
      if (eventDate.getDate() === currentDate.getDate())
        this.date = " Today";
      else
        this.date = (eventDate.getDate() - currentDate.getDate()).toString()+" days left";
    }
    
      this.eventService.getEventImage(this.event?.id || 0).subscribe((data: any) => {
        this.imageUrl = URL.createObjectURL(data);

      });
    const token = sessionStorage.getItem('token');
    const email = jwt_decode<any>(token || '').email;
    for(let invite of this.event?.invites || [])
    {
        if(invite.userInvited === email)
        {
          this.status = invite.status || ' ';
        }
    }      
  }

  makeUrlSafe(imageUrl: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

}

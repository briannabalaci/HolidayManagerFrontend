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
  // coverImg = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  @Input() event?: EventEntity;

  constructor(private eventService: EventService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
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
    return this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}

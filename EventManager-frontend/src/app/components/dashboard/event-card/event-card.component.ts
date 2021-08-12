import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEntity } from '../../../shared/data-types/event';
import { EventService } from '../../../shared/services/event.service';

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

    for(let invite of this.event?.invites || [])
    {
        if(invite.userInvited === sessionStorage.getItem('email'))
        {
          this.status = invite.status || ' ';
        }
    }

      
  }

  makeUrlSafe(imageUrl: string): any {
    return this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}

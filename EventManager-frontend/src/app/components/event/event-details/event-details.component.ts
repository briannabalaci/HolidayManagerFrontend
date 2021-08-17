import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEntity } from 'src/app/shared/data-types/event';
import { EventService } from 'src/app/shared/services/event.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService: EventService, private domSanitizer: DomSanitizer, private route: ActivatedRoute) { }

  event?: EventEntity;
  imageUrl: any;
  eventId: number = 1;


  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.eventService.getEvent(this.eventId).subscribe(
      data => {
        this.event = data;
      },
      err => {
        console.log(err.error);
      }
    );

    
  }

  makeUrlSafe(imageUrl: string): any {
    return this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getMyEvent() {
    const token = sessionStorage.getItem('token')!;
    const email = jwt_decode<any>(token).email;

    for(const invite of this.event!.invites!) {
      if(invite.userInvited === email) {
        return invite;
      }
    }
    return undefined; //will never return this
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEntity } from 'src/app/shared/data-types/event';
import { EventService } from 'src/app/shared/services/event.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService: EventService, private domSanitizer: DomSanitizer,
              private formBuilder: FormBuilder) { }

  event?: EventEntity;
  imageUrl: any;


  ngOnInit(): void {
    this.eventService.getEvent(8).subscribe(
      data => {
        this.event = data;
        this.eventService.getEventImage(this.event?.id || 0).subscribe((data: any) => {
          this.imageUrl = URL.createObjectURL(data);
    
        });
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
    return undefined;
  }

}

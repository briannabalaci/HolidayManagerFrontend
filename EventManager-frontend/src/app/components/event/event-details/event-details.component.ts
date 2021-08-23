import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEntity } from 'src/app/shared/data-types/event';
import { EventService } from 'src/app/shared/services/event.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  role: string = '';
  token: string = '';

  constructor(private eventService: EventService, private domSanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router) { }

  event?: EventEntity;
  imageUrl: any;
  eventId: number = 1;
  date: string = '';
  canUpdate: boolean = true;


  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    this.role = jwt_decode<any>(this.token).roles[0];

    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.eventService.getEvent(this.eventId).subscribe(
      data => {
        this.event = data;

        const currentDate = new Date();
        let limitDate = new Date(this.event?.eventDate!);
        limitDate.setDate(limitDate.getDate() - this.event?.time_limit!);

        if (limitDate <= currentDate){
          this.date = 'Passed time limit for update';
          this.canUpdate = false;
        }
        else
        {
          currentDate.setHours(0,0,0,0);
          limitDate.setHours(0,0,0,0);
          const Time = limitDate. getTime() - currentDate. getTime();
          const Days = Time / (1000 * 3600 * 24);
          this.date = Days.toString()+' days left for update';
        }
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

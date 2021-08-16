import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from 'src/app/shared/data-types/event';
import { Invite } from 'src/app/shared/data-types/invite';
import { UserService } from 'src/app/shared/services/user.service';
import { EventService } from '../../shared/services/event.service';
import jwt_decode from 'jwt-decode';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { Department } from 'src/app/shared/data-types/department';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  departments: string[] = [];
  selectedDepartment: string = '';
  text: string = '';
  minDate = new Date();

  eventFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    event_date: ['', Validators.required],
    event_time: ['', Validators.required],
    location: ['', Validators.required],
    dress_code: ['', Validators.required],
    cover_image: ['', Validators.required]
  })

  invitesSent : Invite[] = [];

  invites: string[] = [];

  constructor(private userService: UserService, private departmentService: DepartmentService, private formBuilder: FormBuilder, private eventService: EventService,private datePipe: DatePipe, private route:Router) { }

  ngOnInit(): void {
    this.departments.push("Include all");
    this.departmentService.getDepartments().subscribe(
      data => {
        for (var object of data) {
          this.departments.push(object.name!+ " department");
        }
      }
    )
  }

  doTextareaValueChange(ev: any) {
    try {
      this.text = ev.target.value;
    } catch(e) {
      console.log('could not set textarea-value');
    }
  }

  checked(): void{
    if (this.selectedDepartment === "Include all"){
      let invitees: string = "";
      this.userService.getUsers().subscribe(
        data => {
          for (let user of data)
            invitees += user.email + ",";

          this.text = invitees.slice(0, -1);
        }
      );
    }
    else{
      let invitees: string = "";
      this.userService.getUsersByDepartment(this.selectedDepartment.split(" ")[0]).subscribe(
        data => {
          for (let user of data)
            invitees += user.email + ",";

            this.text = invitees.slice(0, -1);
        }
      );
    }
  }

  onSubmit() : void {
    if (this.eventFormGroup.status === "VALID"){
      var title = this.eventFormGroup.value.title;
      var eventDate = this.datePipe.transform((this.eventFormGroup.value.event_date+"").replace("00:00:00",this.eventFormGroup.value.event_time+":00"),"yyyy-MM-dd HH:mm:ss");
      var location = this.eventFormGroup.value.location;
      var dress_code = this.eventFormGroup.value.dress_code;
      var cover_image = this.eventFormGroup.value.cover_image;

      this.invites = this.text.split(',');

      for(var val of this.invites)
      {
        if(val !== "")
        {
          this.invitesSent.push(new Invite(val))
        }
      }

      const token = sessionStorage.getItem('token');
      const email = jwt_decode<any>(token || '').email;
     

      this.eventService.createEvent(new EventEntity(title,eventDate || '',location,dress_code,JSON.parse(sessionStorage.getItem('questions') || '{}'),this.invitesSent,email),cover_image)
    }
   
    this.eventFormGroup.reset();
    this.route.navigate(['dashboard']);

  }

  cancel(): void{
    this.eventFormGroup.reset();
    this.text = "";
    this.selectedDepartment = "";
  }

}


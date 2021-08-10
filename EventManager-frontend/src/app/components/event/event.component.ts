import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  public showInvitees = false;

  eventFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    event_date: ['', Validators.required],
    event_time: ['', Validators.required],
    location: ['', Validators.required],
    dress_code: ['', Validators.required],
    cover_image: ['', Validators.required]
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  checked(): void{
    if (this.showInvitees === false){
      let invitees: string="";
      this.userService.getUsers().subscribe(
        data => {
          for (let user of data)
            invitees += user.email+", ";

          const textarea = document.getElementById("invitees")!;
          textarea.innerHTML=invitees;
        }
      );
      this.showInvitees = true;
    }
    else{
        const textarea = document.getElementById("invitees")!;
        textarea.innerHTML="";
        this.showInvitees = true;
    }
  }

  onSubmit() : void {
    if (this.eventFormGroup.status === "VALID"){
      console.log(this.eventFormGroup.value.title);
      console.log((this.eventFormGroup.value.event_date+"").replace("00:00:00",this.eventFormGroup.value.event_time+":00"));
      console.log(this.eventFormGroup.value.location);
      console.log(this.eventFormGroup.value.dress_code);
      console.log(this.eventFormGroup.value.cover_image);
    }
    this.eventFormGroup.reset();
  }

}

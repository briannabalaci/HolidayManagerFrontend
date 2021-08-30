import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from 'src/app/shared/data-types/event';
import { Invite } from 'src/app/shared/data-types/invite';
import { UserService } from 'src/app/shared/services/user.service';
import { EventService } from '../../shared/services/event.service';
import jwt_decode from 'jwt-decode';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { Department } from 'src/app/shared/data-types/department';
import { ThrowStmt } from '@angular/compiler';
import { map, startWith, throwIfEmpty } from 'rxjs/operators';
import { Question } from 'src/app/shared/data-types/question';
import { AssetService } from 'src/app/shared/services/asset.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

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
  questions: Question[] = [];
  update: boolean = false;
  eventStorage?: EventEntity;
  eventId: number = 0;

  MHP_IMAGE_PATH = 'imgs/mhp.png';
  defaultImageFile: File = new File([], "");

  imageSrc:string = '';

  eventFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    event_date: ['', Validators.required],
    event_time: ['', Validators.required],
    location: ['', Validators.required],
    dress_code: ['', Validators.required],
    cover_image: [undefined, []],
    time_limit: ['', Validators.required]
  })

  invitesSent: Invite[] = [];
  invites: string[] = [];
  emails: string[] = [];

  constructor(private userService: UserService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
     private datePipe: DatePipe,
     private route: Router,
     private assetService: AssetService) { }

  ngOnInit(): void {
    this.assetService.assetToFile(this.MHP_IMAGE_PATH).subscribe(imageFile => {
      this.defaultImageFile = imageFile;
    });

    sessionStorage.setItem("back", "-1");

    this.departments.push("Include all");
    this.departmentService.getDepartments().subscribe(
      data => {
        for (var object of data) {
          this.departments.push(object.name! + " department");
        }
      }
    )

    this.userService.getUsers().subscribe(
      data => {
        for (let user of data){
          if (user.role !== "admin")
            this.emails.push(user.email!);
        }
        this.filteredEmails = this.emailCtrl.valueChanges.pipe(
          startWith(null),
          map(
            (email: string | null) => {
              if(email) {
                return this._filter(email);
              }
              else {
                return this.emails.filter( ( el ) => !this.selectedEmails.includes( el ));
              }
            }
            )
          
          );
      }
    );

    

    if (sessionStorage.getItem('event') !== null) {

      this.update = true;
      this.eventStorage = JSON.parse(sessionStorage.getItem('event')!);
      const dateAndTime = this.eventStorage?.eventDate!.split(" ");
      this.eventId = this.eventStorage!.id!;
      this.eventFormGroup.setValue({
        title: this.eventStorage!.title,
        event_date: new Date(dateAndTime![0]),
        event_time: dateAndTime![1],
        location: this.eventStorage!.location,
        dress_code: this.eventStorage!.dressCode,
        cover_image: this.eventStorage!.cover_image,
        time_limit: this.eventStorage!.time_limit
      })

      this.questions = this.eventStorage!.questions!;
      let invitees = '';
      this.invitesSent = this.eventStorage!.invites!;

      this.selectedEmails = this.invitesSent.map(invite => invite.userInvited!);
      sessionStorage.setItem("back",this.eventStorage!.id!.toString());
      sessionStorage.removeItem("event");
    }
  }

  doTextareaValueChange(ev: any) {
    try {
      this.text = ev.target.value;
    } catch (e) {
      console.log('could not set textarea-value');
    }
  }

  checked(): void {
    this.chipList!.errorState = false;
    this.inviteInput!.nativeElement.value = '';
    if (this.selectedDepartment === "Include all") {
      this.selectedEmails = [];
      this.selectedEmails = this.emails;
    }
    else {
      this.selectedEmails = [];
      this.userService.getUsersByDepartment(this.selectedDepartment.split(" ")[0]).subscribe(
        data => {
          for (let user of data){
            if (user.role !== "admin")
              this.selectedEmails.push(user.email);
          }

          const token = sessionStorage.getItem('token');
          const email = jwt_decode<any>(token || ' ').email;
          if (!this.selectedEmails.includes(email)){
            this.selectedEmails.push(email);
          }
        }
      );
    }
  }

  clearCoverImage() {
    this.imageSrc = '';
  }

  onCoverImageInputChange() {
    let file = this.eventFormGroup.controls.cover_image.value?.files[0];
    if(!file) {
      this.clearCoverImage();
      return;
    }

    const pattern = /image-*/;
    if (!file.type.match(pattern)) {
      alert('invalid format');
      this.eventFormGroup.controls.cover_image.setValue(undefined);
      this.clearCoverImage();
      return;
    }

    this.updateCoverImage(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
  }

  updateCoverImage(imageFile: File): void {
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(imageFile);
  }

  onSubmit(): void {
    if (this.eventFormGroup.valid) {
      this.eventFormGroup.value.event_date.setHours(0,0,0,0);
      var title = this.eventFormGroup.value.title;
      var eventDate = this.datePipe.transform((this.eventFormGroup.value.event_date + "").replace("00:00:00", this.eventFormGroup.value.event_time + ":00"), "yyyy-MM-dd HH:mm:ss");
      var location = this.eventFormGroup.value.location;
      var dress_code = this.eventFormGroup.value.dress_code;
      var cover_image = this.eventFormGroup.value.cover_image?.files[0] || this.defaultImageFile;
      var time_limit = this.eventFormGroup.value.time_limit;


      this.invites = this.selectedEmails;

      for (var val of this.invites) {
        if (val !== "" ) {
          let ok = false;
          for(var invite of this.invitesSent)
          {
            if(invite.userInvited === val)
            {
                ok = true;
            }
          }
          if(ok === false)
          {
            this.invitesSent.push(new Invite(val))
          }
        }
      }

      const token = sessionStorage.getItem('token');
      const email = jwt_decode<any>(token || '').email;
      if (this.update === false) {
        this.getBase64(cover_image).then(
          (data: any) => {

            this.eventService.createEvent(new EventEntity(title, eventDate || '', location, dress_code, data, JSON.parse(sessionStorage.getItem('questions') || '{}'), this.invitesSent, email,time_limit)).subscribe(
              data => {
                this.route.navigate(['dashboard']).then(() => {
                  window.location.reload();
                });
              },
              err => {console.log(err)});

          }
        )
      }
      else {
        const e : EventEntity = new EventEntity(title, eventDate || '', location, dress_code, '', JSON.parse(sessionStorage.getItem('questions') || '{}'), this.invitesSent, email, time_limit);
        e.id = this.eventStorage?.id;
        this.eventService.updateEvent(e).subscribe(() => {
          this.route.navigate(['dashboard']).then(() => {
            window.location.reload();
          });
        }, err => {console.log(err)});
      }
    }

    this.eventFormGroup.reset();
  }

  cancel(): void{
    this.route.navigate(['dashboard']);
  }

  getBase64(file: File): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails?: Observable<string[]>;
  selectedEmails: string[] = [];

  @ViewChild('inviteInput') inviteInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('chipList') chipList: MatChipList | undefined;

  addFromClick(): void {
    this.chipList!.errorState = false;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our email
    if (value) {
      if(this.emails.includes(value)) {
        this.selectedEmails.push(value);
        this.chipList!.errorState = false;
      }
      else {
        this.chipList!.errorState = true;
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.selectedEmails.indexOf(email);
    this.inviteInput!.nativeElement.value = '';
    if (index >= 0) {
      this.selectedEmails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedEmails.push(event.option.viewValue);
    this.chipList!.errorState = false;
    if(this.inviteInput)
      this.inviteInput!.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let unselectedEmails = this.emails.filter( ( el ) => !this.selectedEmails.includes( el ));
    return unselectedEmails.filter(email => email.toLowerCase().includes(filterValue));
  }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    event_date: ['', Validators.required],
    event_time: ['', Validators.required],
    location: ['', Validators.required],
    dress_code: ['', Validators.required],
    cover_image: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}

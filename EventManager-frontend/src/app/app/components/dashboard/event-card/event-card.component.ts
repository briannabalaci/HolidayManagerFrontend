import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  status: string = 'Accepted'

  constructor() { }

  ngOnInit(): void {
  }

}

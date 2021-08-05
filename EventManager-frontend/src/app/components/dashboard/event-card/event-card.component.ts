import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  title: string = 'Best event ever';
  location: string = 'Cluj-Napoca';
  date: string = '1 Jan 2022'
  status: string = 'Accepted'
  coverImg = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}

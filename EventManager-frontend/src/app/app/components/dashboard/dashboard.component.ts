import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //role = 'attendee';
  role = 'organizer';
  
  filters: string[] = [
    'All Events', 'Future Events', 'Accepted', 'Declined'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onCreateEvent() {
    console.log('Create new event');
  }

}

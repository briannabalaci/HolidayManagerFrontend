import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { EventEntity } from '../../shared/data-types/event';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  role: string = '';
  token: string = '';
  
  filters: string[] = [
    'All Events', 'Future Events', 'Accepted', 'Declined'
  ];
  events?: EventEntity[];
  selectedFilter = this.filters[0];

  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    this.role = jwt_decode<any>(this.token).roles[0];

    this.eventService.getEventsByUserIdAndFilter(jwt_decode<any>(this.token).email, this.selectedFilter).subscribe(data => {
      this.events = data;
    })

    console.log(this.events)

  }

  onCreateEvent() {
    this.router.navigate(['event']);
  }
  
  getEventByFilter(): void {
    console.log('Hello');
    this.eventService.getEventsByUserIdAndFilter(jwt_decode<any>(this.token).email, this.selectedFilter).subscribe(data => 
    {
      this.events = data;
    });
  }

}

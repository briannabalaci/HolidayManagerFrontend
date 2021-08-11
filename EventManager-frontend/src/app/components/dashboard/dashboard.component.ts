import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { EventEntity } from '../../shared/data-types/event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  role: string = '';
  
  filters: string[] = [
    'All Events', 'Future Events', 'Accepted', 'Declined'
  ];
  events?: EventEntity[];
  selectedFilter = this.filters[0];

  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')!;

    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    })

    console.log(this.events)

  }

  onCreateEvent() {
    this.router.navigate(['event']);
  }

}

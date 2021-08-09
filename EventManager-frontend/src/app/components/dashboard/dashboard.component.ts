import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selectedFilter = this.filters[0];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')!;
  }

  onCreateEvent() {
    this.router.navigate(['event']);
  }

}

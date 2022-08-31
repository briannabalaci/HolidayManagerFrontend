import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("ajung aici ")
  }
  getRecord() { this.router.navigate(['/user-panel']); }
  getRecord2() { this.router.navigate(['/team-management']);}
}

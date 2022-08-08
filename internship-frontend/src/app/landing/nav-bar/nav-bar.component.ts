import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  logoutUser(){
    this.cookieService.delete('Token');
    // document.cookie = 'Token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    this.router.navigate(['/login']);
  }
}

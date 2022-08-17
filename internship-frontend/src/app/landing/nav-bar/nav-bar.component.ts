import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  CookieService } from 'ngx-cookie-service';
import { UserType } from 'src/app/shared/data-type/User';
import { parseJwt } from 'src/app/utils/JWTParser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  name = '';
  notificationNum = 12;
  notificationsVisible = false;
  canShowNotification = true;
  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    const token = this.cookieService.get('Token');
    if (token) {
      const parsed = parseJwt(token);
      this.name = parsed.username;
      if (parsed.type == UserType.ADMIN) {
        this.canShowNotification = false;
      }
    }
  }
  logoutUser(){
    this.cookieService.delete('Token');
    // document.cookie = 'Token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    this.router.navigate(['/login']);
  }
  redirectUser() {
    const token = this.cookieService.get('Token');
    // @ts-ignore
    const type: UserType = parseJwt(token).type;
    if(type == UserType.ADMIN){
      this.router.navigate(['/admin']);
    }
    else if(type == UserType.EMPLOYEE){
      this.router.navigate(['/employee']);
    }
    else if(type == UserType.TEAMLEAD){
      this.router.navigate(['/teamlead']);
    }
  }
  showNotifications() {
    this.notificationsVisible = !this.notificationsVisible;
    this.notificationNum = 0;
  }
}

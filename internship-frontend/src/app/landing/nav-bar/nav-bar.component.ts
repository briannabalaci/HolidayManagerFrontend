import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  CookieService } from 'ngx-cookie-service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserType } from 'src/app/shared/data-type/User';
import { parseJwt } from 'src/app/utils/JWTParser';
import {StompService} from "../../service/stomp/stomp.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  name = '';
  id = 0;
  notificationNum = 10;
  notificationsVisible = false;
  canShowNotification = true;

  constructor(private router: Router, private cookieService: CookieService, private notificationService: NotificationService, private stompService:StompService) { }

  ngOnInit(): void {
    console.log("nr notif" + this.notificationNum)
    console.log(this.notificationService.getAllUnseenNotifications)
    
    this.stompService.subscribe('/topic/notification', (): void => {
      this.notificationNum ++;
    })

    const token = this.cookieService.get('Token');
    if (token) {
      const parsed = parseJwt(token);
      this.name = parsed.username;
      this.id = parsed.id;
      if (parsed.type == UserType.ADMIN) {
        this.canShowNotification = false;
      }
    }
    this.notificationService.getAllUnseenNotifications(this.id).subscribe(data => {
      this.notificationNum = data.length;
      console.log("nr notif " + this.notificationNum)
    })
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
    if (!this.notificationsVisible) {
      this.notificationService.updateSeenNotifications(this.id).subscribe(data => {
        this.notificationNum = 0;
      });
    }
  }
}

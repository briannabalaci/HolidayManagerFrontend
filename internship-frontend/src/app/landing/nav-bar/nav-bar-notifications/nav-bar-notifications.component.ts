import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import { Console, time } from "console";
import { CookieService } from "ngx-cookie-service";
import { NotificationService } from "src/app/service/notification.service";
import { MyNotification, NotificationType } from "src/app/shared/data-type/Notification";
import { NotificationDTO } from "src/app/shared/data-type/NotificationDto";
import { User } from "src/app/shared/data-type/User";
import { parseJwt } from "src/app/utils/JWTParser";


@Component({
  selector: 'app-nav-bar-notifications',
  templateUrl: './nav-bar-notifications.component.html',
  styleUrls: ['./nav-bar-notifications.component.scss']
})
export class NavBarNotificationsComponent implements OnInit {

  constructor(private notificationService:NotificationService, private cookieService: CookieService) { }
  user!: User;
  id!: number;
  unseenNotif!: MyNotification[];
  seenNotif!: MyNotification[];
  unseenNotif1!: NotificationDTO[];
  seenNotif1!: NotificationDTO[];
  notificationMessage:boolean = false
  @Output() refreshTableTeamLead = new EventEmitter<String>();

  ngOnInit(): void {
    this.getAndSetNotificationData()

  }
  getAndSetNotificationData() {
    const token = this.cookieService.get('Token');
    if (token) {
      const parsed = parseJwt(token);
      this.id = parsed.id;
    }

    this.notificationService.getAllSeenNotifications(this.id).subscribe(data => {
      console.log(data)
      this.seenNotif1 = data.map(x => <NotificationDTO>{
        sender: x.sender.forname + " " + x.sender.surname,
        message: this.get_message(x.type),
        header: this.get_header(x.type),
        time: this.timeSince(x.sendDate)
      });
    })
    this.notificationService.getAllUnseenNotifications(this.id).subscribe(data => {
      console.log(data)
      if(data.length!==0) this.notificationMessage = true
      else this.notificationMessage = false
      this.unseenNotif1 = data.map(x => <NotificationDTO>{
        sender: x.sender.forname + " " + x.sender.surname,
        message: this.get_message(x.type),
        header: this.get_header(x.type),
        time: this.timeSince(x.sendDate)
      });
    })
  }

  get_message(type: NotificationType) {
    switch (type.toString()) {
      case "SENT":
        return "A holiday request was sent by "
      case "UPDATE":
        return "A holiday request was updated by "
      case "MORE_DETAILS":
        return "You were requested more details by "
      case "APPROVED":
        return "Your request was approved by "
      case "DENIED":
        return "Your request was denied by "
      default:
        return "You got sent a notification by  "
    }

  }

  get_header(type: NotificationType) {
    console.log(type)
    switch (type.toString()) {
      case "SENT":
        return "Request sent"
      case "UPDATE":
        return "Request updated"
      case "MORE_DETAILS":
        return "More details"
      case "APPROVED":
        return "Request approved"
      case "DENIED":
        return "Request denied"
      default:
        return "NOTIFICATION"
    }

  }
  timeSince(date: Date) {
    var newDate = new Date(date.valueOf())
    var seconds = Math.floor((new Date().getTime() - newDate.getTime()) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " yrs";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " mon";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "min";
    }
    return Math.floor(seconds) + " sec";
  }


}






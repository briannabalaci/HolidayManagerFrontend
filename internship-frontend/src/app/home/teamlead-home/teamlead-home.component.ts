import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teamlead-home',
  templateUrl: './teamlead-home.component.html',
  styleUrls: ['./teamlead-home.component.scss']
})
export class TeamleadHomeComponent implements OnInit {

  newNotification:{ message: string }
  constructor() { }

  ngOnInit(): void {
  }

  newNotificationSignalReceived(message:string) {
    console.log("1. In teamlead home")
    const mess = {"message": "Update the tables! "}
    this.newNotification = Object.assign({}, mess)
  }
}

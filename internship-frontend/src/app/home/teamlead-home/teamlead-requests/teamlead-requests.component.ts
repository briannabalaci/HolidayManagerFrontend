import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/data-type/User";
import {TeamleadService} from "../../../service/teamlead.service";
import {Holiday, HolidayType} from "../../../shared/data-type/Holiday";


class RequestsUser {
  startDate?: Date;
  endDate?: Date;
  type?: HolidayType;
}

const ELEMENT_DATA: RequestsUser[] = [
]

@Component({
  selector: 'app-teamlead-requests',
  templateUrl: './teamlead-requests.component.html',
  styleUrls: ['./teamlead-requests.component.scss']
})
export class TeamleadRequestsComponent implements OnInit {


  nrHolidays: number = 0;
  user!: User;
  requestsTypes: string[] = ['All request', 'Rest holiday', 'Special holiday', 'Unpaid holiday']

  requests!: Holiday[];
  teamLeadRequests = ELEMENT_DATA;
  constructor(private teamLeadService: TeamleadService) { }

  ngOnInit(): void {
    this.teamLeadService.getUser().subscribe(data => {
      this.user = data;
      this.nrHolidays = +data.nrHolidays!;
      console.log(data);
    })

    this.teamLeadService.getTeamLeadsRequests().subscribe( data => {
      this.requests = data;
      this.convertData();
      console.log(data);
    })
  }

  convertData(){
    this.teamLeadRequests = this.requests.map(obj => {return {startDate: obj.startDate, endDate: obj.endDate, type: obj.type}});
  }

}

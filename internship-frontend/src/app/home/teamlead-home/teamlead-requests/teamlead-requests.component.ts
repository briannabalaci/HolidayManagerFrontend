import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/data-type/User";
import {TeamleadService} from "../../../service/teamlead.service";
import {Holiday, HolidayType} from "../../../shared/data-type/Holiday";


export class HolidayTypeView {
  value?: string;
  viewValue?: string;
  constructor(value: string, viewvalue: string) { }
}

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
  constructor(private teamLeadService: TeamleadService) { }

  ngOnInit(): void {
    this.getAndSetTeamLeadData();
  }

  getAndSetTeamLeadData(){
    this.teamLeadService.getUser().subscribe(data => {
      this.user = data;

      this.nrHolidays = +data.nrHolidays!;

      this.populateTeamLeadRequests();
    })
  }

  populateTeamLeadRequests(){
    this.teamLeadService.getTeamLeadsRequests(this.user!.id!).subscribe( data => {
      this.requests = data;
    })
  }

  getFilteredRequests(type: HolidayType){
    this.teamLeadService.getRequestsFilteredByType(type, this.user!.id!).subscribe(data => {
      this.requests = data;
    })
  }

  onChange(value: any): void {
    switch (value){
      case 'All request': {
        this.populateTeamLeadRequests();
        break;
      }
      case 'Rest holiday': {
        this.getFilteredRequests(HolidayType.REST_HOLIDAY);
        break;
      }
      case 'Special holiday': {
        this.getFilteredRequests(HolidayType.SPECIAL_HOLIDAY);
        break;
      }
      case 'Unpaid holiday': {
        this.getFilteredRequests(HolidayType.UNPAID_HOLIDAY);
        break;
      }
    }
  }


}

import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/data-type/User";
import {TeamleadService} from "../../../service/teamlead.service";
import {HolidayDto, HolidayTypeDto} from "../../../shared/data-type/HolidayDto";


@Component({
  selector: 'app-teamlead-requests',
  templateUrl: './teamlead-requests.component.html',
  styleUrls: ['./teamlead-requests.component.scss']
})
export class TeamleadRequestsComponent implements OnInit {

  showFormCreateRequest = false;
  nrHolidays: number = 0;
  user!: User;
  requestsTypes: string[] = ['All request', 'Rest holiday', 'Special holiday', 'Unpaid holiday']


  requests!: HolidayDto[];
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

  getFilteredRequests(type: HolidayTypeDto){
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
        this.getFilteredRequests(HolidayTypeDto.REST_HOLIDAY);
        break;
      }
      case 'Special holiday': {
        this.getFilteredRequests(HolidayTypeDto.SPECIAL_HOLIDAY);
        break;
      }
      case 'Unpaid holiday': {
        this.getFilteredRequests(HolidayTypeDto.UNPAID_HOLIDAY);
        break;
      }
    }
  }


}

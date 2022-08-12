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
  selectedValue: any;
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
    switch (value) {
      case 'All request': {
        this.populateTeamLeadRequests();
        this.selectedValue = null;
        break;
      }
      case 'Rest holiday': {
        this.getFilteredRequests(HolidayTypeDto.REST_HOLIDAY);
        this.selectedValue = HolidayTypeDto.REST_HOLIDAY;
        break;
      }
      case 'Special holiday': {
        this.getFilteredRequests(HolidayTypeDto.SPECIAL_HOLIDAY);
        this.selectedValue = HolidayTypeDto.SPECIAL_HOLIDAY;
        break;
      }
      case 'Unpaid holiday': {
        this.getFilteredRequests(HolidayTypeDto.UNPAID_HOLIDAY);
        this.selectedValue = HolidayTypeDto.UNPAID_HOLIDAY;
        break;
      }
    }
  }

  get refreshDataFunc() {
    return this.refreshData.bind(this);
  }

  refreshData() {
    if(this.selectedValue === HolidayTypeDto.SPECIAL_HOLIDAY)
    {
      this.getFilteredRequests(HolidayTypeDto.SPECIAL_HOLIDAY)
    }
    else if(this.selectedValue === HolidayTypeDto.UNPAID_HOLIDAY){
      this.getFilteredRequests(HolidayTypeDto.UNPAID_HOLIDAY)
    }
    else if(this.selectedValue === HolidayTypeDto.REST_HOLIDAY) {
      this.getFilteredRequests(HolidayTypeDto.REST_HOLIDAY)
    }
    else {
      this.populateTeamLeadRequests();
    }
  }

}



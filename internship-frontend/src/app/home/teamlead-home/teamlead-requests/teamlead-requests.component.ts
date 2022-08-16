import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../shared/data-type/User";
import {TeamleadService} from "../../../service/teamlead.service";
import {RequestsTableComponent} from "../../../shared/requests-table/requests-table.component";
import {UserService} from "../../../service/user.service";


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

  selectedTypeValue = this.requestsTypes[0].valueOf();
  selectedStatusValue = 'All'

  @ViewChild(RequestsTableComponent) requests: RequestsTableComponent;

  constructor(private userService: UserService, private teamLeadService: TeamleadService) { }

  ngOnInit(): void {
    this.getAndSetTeamLeadData();
  }

  getAndSetTeamLeadData(){
    this.userService.getUser().subscribe(data => {

      this.user = data;
      this.nrHolidays = +data.nrHolidays!;

    })
  }

  onTypeChange(value: any): void {
    this.selectedTypeValue = value;
    this.requests.selectedTypeChild = value;
    this.requests.selectedStatusChild = this.selectedStatusValue;
    this.requests.filterByTypeAndStatus(this.requests.selectedTypeChild, this.requests.selectedStatusChild)
  }


  get refreshDataFunc() {
    return this.requests.refreshData.bind(this);
  }

}



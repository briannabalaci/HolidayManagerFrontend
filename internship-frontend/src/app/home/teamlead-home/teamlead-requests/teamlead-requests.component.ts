import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {User} from "../../../shared/data-type/User";
import {TeamleadService} from "../../../service/teamlead.service";
import {RequestsTableComponent} from "../../../shared/requests-table/requests-table.component";
import {UserService} from "../../../service/user.service";


@Component({
  selector: 'app-teamlead-requests',
  templateUrl: './teamlead-requests.component.html',
  styleUrls: ['./teamlead-requests.component.scss']
})

export class TeamleadRequestsComponent implements OnInit,OnChanges {

  showFormCreateRequest = false;
  endDate = 'Angular';
  startDate = 'Angular';
  substitute = '';
  holidayType = 'rest-holiday';
  holidayUpdating = false;
  holidayUpdatingId = -1;
  holidayUpdatingStartDate = '';
  holidayUpdatingEndDate = '';
  holidayUpdatingSubstitute = '';
  nrHolidays: number;
  user!: User;
  details = '';
  requestsTypes: string[] = ['All requests', 'Rest holiday', 'Special holiday', 'Unpaid holiday']

  selectedTypeValue = this.requestsTypes[0].valueOf();
  selectedStatusValue = 'All'

  @ViewChild(RequestsTableComponent) requests: RequestsTableComponent;

  constructor(private userService: UserService, private teamLeadService: TeamleadService) { }

  ngOnInit(): void {
    this.getAndSetTeamLeadData();
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  newRequestAddedHandler(message:string){
    this.getAndSetTeamLeadData() //update the vacation days
    this.refreshData()
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

  showForm() {
    this.showFormCreateRequest = !this.showFormCreateRequest;
    this.holidayUpdating = false;
  }

  refreshData() {
    this.requests.refreshData();
  }
  get refreshDataFunc() {
    return this.refreshData.bind(this);
  }
  changeVacationDays(eventData: any) {
    this.nrHolidays =  eventData ;
  }


}



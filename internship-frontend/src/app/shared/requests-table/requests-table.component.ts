import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../data-type/HolidayDto";
import {User} from "../data-type/User";
import {Team} from "../data-type/Team";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TeamleadService} from "../../service/teamlead.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {UserService} from "../../service/user.service";
import {HolidayService} from "../../service/holiday.service";
import {Holiday, HolidayStatus} from "../data-type/Holiday";


const ELEMENT_DATA: HolidayDto[] = []

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss']
})

export class RequestsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['startDate', 'endDate', 'type', 'edit', 'delete']
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @Input() selectedTypeChild: any;
  @Input() selectedStatusChild: any;

  user!: User;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private holidayService: HolidayService, private userService: UserService, private teamLeadService: TeamleadService, private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {

    this.getTeamLeaderData();

  }


  getTeamLeaderData() {
    this.userService.getUser().subscribe(data => {

      this.user = data;
      this.populateTeamLeadRequests();
    })
  }

  populateTeamLeadRequests() {
    this.teamLeadService.getTeamLeadsRequests(this.user!.id!).subscribe(data => {

      this.dataSource = new MatTableDataSource<HolidayDto>(data);

      this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;

    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getStatus(status: any): HolidayStatusDto{
    if(status == 'Pending'){
      this.selectedStatusChild = HolidayStatusDto.PENDING;
      status = HolidayStatusDto.PENDING;
    } else if(status == 'Approved'){
      this.selectedStatusChild = HolidayStatusDto.APPROVED;
      status = HolidayStatusDto.APPROVED;
    } else {
      this.selectedStatusChild = HolidayStatusDto.DENIED;
      status = HolidayStatusDto.DENIED;
    }

    return status
  }

  getType(type: any): HolidayTypeDto {
    if(type == 'Rest holiday'){
      this.selectedTypeChild = HolidayTypeDto.REST_HOLIDAY;
      type = HolidayTypeDto.REST_HOLIDAY;
    }
    else if(type == 'Special holiday'){
      this.selectedTypeChild = HolidayTypeDto.SPECIAL_HOLIDAY;
      type = HolidayTypeDto.SPECIAL_HOLIDAY;
    } else{
      this.selectedTypeChild = HolidayTypeDto.UNPAID_HOLIDAY;
      type = HolidayTypeDto.UNPAID_HOLIDAY;
    }

    return type
  }

  getFilteredByType(type: any){
    this.holidayService.getRequestsFilteredByType(this.getType(type), this.user!.id!).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  getFilteredByStatus(status: any){
    this.holidayService.getRequestsFilteredByStatus(this.getStatus(status), this.user!.id!).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  getFilteredByStatusAndType(status: any, type: any){
    this.holidayService.getRequestsFilteredByStatusAndType(this.getStatus(status), this.getType(type), this.user!.id!).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  filterByTypeAndStatus(type: any, status: any): void {
    switch (true) {
      case type == 'All request' && status == 'All':
        this.populateTeamLeadRequests();
        this.selectedTypeChild = null;
        this.selectedStatusChild = null;
        break;

      case type != 'All request' && status == 'All':
        this.getFilteredByType(type)
        break;

      case type == 'All request' && status != 'All':
        this.getFilteredByStatus(status)
        break;

      default:
        this.getFilteredByStatusAndType(status, type)
        break;
    }
  }

  filterByType(value: any): void {
    switch (value) {
      case 'All request': {
        this.populateTeamLeadRequests();
        this.selectedTypeChild = null;
        break;
      }
      case 'Rest holiday': {
        this.getFilteredByType(HolidayTypeDto.REST_HOLIDAY);
        this.selectedTypeChild = HolidayTypeDto.REST_HOLIDAY;
        break;
      }
      case 'Special holiday': {
        this.getFilteredByType(HolidayTypeDto.SPECIAL_HOLIDAY);
        this.selectedTypeChild = HolidayTypeDto.SPECIAL_HOLIDAY;
        break;
      }
      case 'Unpaid holiday': {
        this.getFilteredByType(HolidayTypeDto.UNPAID_HOLIDAY);
        this.selectedTypeChild = HolidayTypeDto.UNPAID_HOLIDAY;
        break;
      }
    }
  }

  refreshData() {
    if(this.selectedStatusChild == null && this.selectedTypeChild == null){
      this.populateTeamLeadRequests();
    } else if(this.selectedStatusChild != null && this.selectedTypeChild == null){
      this.getFilteredByStatus(this.selectedStatusChild)
    } else if(this.selectedStatusChild == null && this.selectedTypeChild != null){
      this.getFilteredByType(this.selectedTypeChild)
    } else {
      this.getFilteredByStatusAndType(this.selectedStatusChild, this.selectedTypeChild)
    }
  }
  fillFields(element: HolidayDto) {
    console.log(element.id);
  }

}

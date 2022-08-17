import { Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { HolidayService } from 'src/app/service/holiday.service';
import { UserService } from 'src/app/service/user.service';
import { parseJwt } from 'src/app/utils/JWTParser';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Holiday,  HolidayStatus,  HolidayTypeView, ReqestStatusView } from 'src/app/shared/data-type/Holiday';
import { DatePipe } from '@angular/common';
import {User} from "../../shared/data-type/User";
import {RequestsTableComponent} from "../../shared/requests-table/requests-table.component";

// TO DO: move new data type in a separate folder
const HOLIDAY_DATA: Holiday[] =[
];

@Component({
  selector: 'app-employeedash',
  templateUrl: './employeedash.component.html',
  styleUrls: ['./employeedash.component.scss']
})
export class EmployeedashComponent implements OnInit {

  showFormCreateRequest = false;
  public vacationdays = 2;
  endDate = 'Angular';
  startDate = 'Angular';
  substitute = '';
  holidayType = 'rest-holiday';
  holidayUpdating = false;
  holidayUpdatingId = -1;
  holidayUpdatingStartDate = '';
  holidayUpdatingEndDate = '';
  holidayUpdatingSubstitute = '';


  displayedColumns: string[] = ['startDate', 'endDate',  'status', 'Edit'];
  dataSource = new MatTableDataSource(HOLIDAY_DATA);
  holidayList: HolidayTypeView[] = [
    {value: 'all-requests', viewValue: 'All requests'},
    {value: 'rest-holiday', viewValue: 'Rest holidays'},
    {value: 'special-holiday', viewValue: 'Special holiday'},
    {value: 'unpaid-holiday', viewValue: 'Unpaid holiday'}
  ];
  statusList: ReqestStatusView[] = [
    {value: 'ALL', viewValue: 'All statuses'},
    {value: 'PENDING', viewValue: 'Pending'},
    {value: 'APPROVED', viewValue: 'Approved'},
    {value: 'DENIED', viewValue: 'Denied'}
  ]
  selected = this.holidayList[0].value;
  selected2 = this.statusList[0].value;
  constructor(private _liveAnnouncer: LiveAnnouncer, private holidayService:HolidayService, private cookieService: CookieService, private userService: UserService) {}
  vacationDays: number = 0;
  user!: User;

  requestsTypes: string[] = ['All request', 'Rest holiday', 'Special holiday', 'Unpaid holiday']
  requestsStatus: string[] = ['All', 'Pending', 'Approved', 'Denied']

  selectedTypeValue = this.requestsTypes[0].valueOf();
  selectedStatusValue = this.requestsStatus[0].valueOf();

  @ViewChild(RequestsTableComponent) requests: RequestsTableComponent;

  completeData(row: any): void {
    this.holidayUpdating = true;
    this.showFormCreateRequest = true;
    this.holidayUpdatingId = row.id;
    this.holidayUpdatingStartDate = row.startDate;
    this.holidayUpdatingEndDate = row.endDate;
    this.holidayUpdatingSubstitute = row.substitute;
    switch (row.type) {
      case 'UNPAID':
        this.holidayType = 'unpaid-holiday';
        break;
      case 'SPECIAL':
        this.holidayType = 'special-holiday';
        break;
      case 'REST':
        this.holidayType = 'rest-holiday';
        break;
    }
  }
  ngOnInit() {
    this.getAndSetEmployeeData();
  }

  getAndSetEmployeeData() {
    this.userService.getUser().subscribe(data => {

      this.user = data;
      this.vacationDays = +data.nrHolidays!;

    })
  }

  onTypeChange(value: any): void {
    this.selectedTypeValue = value;
    this.requests.selectedTypeChild = value;
    this.requests.selectedStatusChild = this.selectedStatusValue;
    this.requests.filterByTypeAndStatus(this.requests.selectedTypeChild, this.requests.selectedStatusChild)
  }

  onStatusChange(value: any): void {
    this.selectedStatusValue = value;
    this.requests.selectedStatusChild = value;
    this.requests.selectedTypeChild = this.selectedTypeValue;
    this.requests.filterByTypeAndStatus(this.requests.selectedTypeChild, this.requests.selectedStatusChild)
  }

  get refreshDataFunc() {
    return this.requests.refreshData.bind(this);
  }
  refreshData() {
    /*
    const tk = this.cookieService.get('Token');
    const email: String = parseJwt(tk).username;
    const id: number = parseJwt(tk).id;
    var datePipe = new DatePipe('en-US');
    this.holidayService.getAllHolidaysById(id).subscribe(data => {
      this.holidays = data;
      this.dataSource = new MatTableDataSource(this.holidays);
      this.dataSource.sort = this.sort;
      this.applyFilters(this.selected2, this.selected);
    });
    */
  }
  showForm() {
    this.showFormCreateRequest = !this.showFormCreateRequest;
    this.holidayUpdating = false;
  }

}



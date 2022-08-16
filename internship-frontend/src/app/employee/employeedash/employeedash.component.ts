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

// TO DO: move new data type in a separate folder
const HOLIDAY_DATA: Holiday[] =[ 
];

@Component({
  selector: 'app-employeedash',
  templateUrl: './employeedash.component.html',
  styleUrls: ['./employeedash.component.scss']
})
export class EmployeedashComponent implements AfterViewInit {
  
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

  holidays?: Holiday[] = HOLIDAY_DATA;
  sortedTable?: Holiday[];
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    const tk = this.cookieService.get('Token');

    const email: String = parseJwt(tk).username;
    const id: number = parseJwt(tk).id;
    this.holidayService.getAllHolidaysById(id).forEach(x => console.log(x));
    var datePipe = new DatePipe('en-US');
    this.holidayService.getAllHolidaysById(id).subscribe(data => {
      this.holidays = data;
      console.log(this.holidays);
      this.dataSource = new MatTableDataSource(this.holidays);
      this.dataSource.sort = this.sort;
    });
    console.log(this.holidays?.filter(holiday => holiday.status === HolidayStatus.PENDING))
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  clearData(): void{
  this.endDate = '';
  this.startDate = '';
  this.substitute = '';
  }

  completeData(row: any): void{
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

  filterByType(deviceValue: any, table: Holiday[] | undefined): Holiday[] | undefined{
    switch(deviceValue){
      case 'all-requests': {
        return table;
      }
      case 'rest-holiday': {
        table = table?.filter(holiday => holiday.type?.toString() === "REST");
        this.dataSource.sort = this.sort;
        return table;
      }
      case 'special-holiday': {
        table = table?.filter(holiday => holiday.type?.toString() === "SPECIAL");
        return table;
      }
      case 'unpaid-holiday': {
        table = table?.filter(holiday => holiday.type?.toString() === "UNPAID");
        return table;
      }
        
    }
    return table;
  }


  filterByStatus(deviceValue: any, table: Holiday[] | undefined): Holiday[] | undefined{
    switch(deviceValue){
      case 'ALL': {
        return table;
      }
      case 'PENDING': {
        table = table?.filter(holiday => holiday.status?.toString() === 'PENDING');
        return table;
      }
      case 'APPROVED': {
        table = table?.filter(holiday => holiday.status?.toString() === 'APPROVED');
        return table;
      }
      case 'DENIED': {
        table = table?.filter(holiday => holiday.status?.toString() === 'DENIED');
        return table;
      }
    }
    return table;
  }
  changefilterStatus(filterstat: any): void {
    this.selected2 = filterstat;
    this.applyFilters(this.selected2, this.selected);
    
  }
  changefilterType(filterstat: any): void {
    this.selected = filterstat;
    this.applyFilters(this.selected2, this.selected);
  }
  applyFilters(filterStatus: any, filterType: any): void{
    this.sortedTable = this.holidays;
    this.sortedTable = this.filterByStatus(filterStatus, this.sortedTable);
    this.sortedTable = this.filterByType(filterType, this.sortedTable);
    this.dataSource = new MatTableDataSource(this.sortedTable);
    this.dataSource.sort = this.sort;
  }
  get refreshDataFunc() {
    return this.refreshData.bind(this);
  }
  refreshData() {
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
  }
  showForm() {
    this.showFormCreateRequest = !this.showFormCreateRequest;
    this.holidayUpdating = false;
  }
  
}




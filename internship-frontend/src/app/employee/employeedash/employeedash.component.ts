import { Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { HolidayService } from 'src/app/service/holiday.service';
import { UserService } from 'src/app/service/user.service';
import { Holiday, HolidayStatus, HolidayType, RequestType } from 'src/app/shared/data-type/Holiday';
import { User } from 'src/app/shared/data-type/User';
import { parseJwt } from 'src/app/utils/JWTParser';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

// TO DO: move new data type in a separate folder
const HOLIDAY_DATA: Holiday[] =[ /*
  {startDate: new Date(1995, 11, 17),endDate: new Date(1995, 11, 17), status: HolidayStatus.PENDING, type: RequestType.REST, substitute: 'Andor' },
  {startDate: new Date(2010, 12, 17),endDate: new Date(2010, 12, 27), status: HolidayStatus.PENDING, type: RequestType.SPECIAL, substitute: 'Brianna'},
  {startDate: new Date(2022, 8, 17),endDate: new Date(2022, 8, 25), status: HolidayStatus.PENDING, type: RequestType.UNPAID, substitute: 'Tara'},
  {startDate: new Date(2021, 1, 13),endDate: new Date(2021, 2, 1), status: HolidayStatus.PENDING, type: RequestType.REST, substitute: 'Alexandra'}
*/
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
  constructor(private _liveAnnouncer: LiveAnnouncer, private holidayService:HolidayService, private cookieService: CookieService, private userService: UserService) {}

  holidays?: Holiday[];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    const tk = this.cookieService.get('Token');

    const email: String = parseJwt(tk).username;
    const id: number = parseJwt(tk).id;
    console.log(email);
    this.holidayService.getAllHolidaysById(id).forEach(x => console.log(x));
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  displayedColumns: string[] = ['startDate', 'endDate',  'status', 'Edit'];
  dataSource = new MatTableDataSource(HOLIDAY_DATA);
  holidayList: HolidayType[] = [
    {value: 'all-requests', viewValue: 'All requests'},
    {value: 'rest-holiday', viewValue: 'Rest holidays'},
    {value: 'special-holiday', viewValue: 'Special holiday'},
    {value: 'unpaid-holiday', viewValue: 'Unpaid holiday'}
  ];

  clearData(): void{
  this.endDate = '';
  this.startDate = '';
  this.substitute = '';
  }

  completeData(row: any): void{
    this.endDate = row.endDate;
    this.startDate = row.startDate;
    this.substitute = row.substitute;
  }

  onChange(deviceValue: any): void{
    switch(deviceValue){
      case 'all-requests': {
        this.dataSource = new MatTableDataSource(HOLIDAY_DATA);
        this.dataSource.sort = this.sort;
        break;
      }
      case 'rest-holiday':{
        this.dataSource = new MatTableDataSource(HOLIDAY_DATA.filter(holiday => holiday.type === RequestType.REST));
        this.dataSource.sort = this.sort;
        break;
      }
      case 'special-holiday':{
        this.dataSource = new MatTableDataSource(HOLIDAY_DATA.filter(holiday => holiday.type === RequestType.SPECIAL));
        this.dataSource.sort = this.sort;
        break;
      }
      case 'unpaid-holiday':{
        this.dataSource = new MatTableDataSource(HOLIDAY_DATA.filter(holiday => holiday.type === RequestType.UNPAID));
        this.dataSource.sort = this.sort;
        break;
      }
    }
  }
}




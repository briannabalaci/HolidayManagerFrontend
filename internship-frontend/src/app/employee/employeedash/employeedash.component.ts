import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { HolidayService } from 'src/app/service/holiday.service';
import { UserService } from 'src/app/service/user.service';
import { Holiday, HolidayType, RequestType } from 'src/app/shared/data-type/Holiday';
import { User } from 'src/app/shared/data-type/User';
import { parseJwt } from 'src/app/utils/JWTParser';


// TO DO: move new data type in a separate folder
const HOLIDAY_DATA: Holiday[] =[ 
  {startDate: new Date(1995, 11, 17),endDate: new Date(1995, 11, 17), status: 'Pending', type: RequestType.REST, substitute: 'Andor' },
  {startDate: new Date(2010, 12, 17),endDate: new Date(2010, 12, 27), status: 'Rejected', type: RequestType.SPECIAL, substitute: 'Brianna'},
  {startDate: new Date(2022, 8, 17),endDate: new Date(2022, 8, 25), status: 'Approved', type: RequestType.UNPAID, substitute: 'Tara'},
  {startDate: new Date(2021, 1, 13),endDate: new Date(2021, 2, 1), status: 'Pending', type: RequestType.REST, substitute: 'Alexandra'}
];

@Component({
  selector: 'app-employeedash',
  templateUrl: './employeedash.component.html',
  styleUrls: ['./employeedash.component.scss']
})
export class EmployeedashComponent implements OnInit {
  public vacationdays = 2;
  endDate = 'Angular';
  startDate = 'Angular';
  substitute = '';
  user?: User;
  holidays?: Holiday[];

  displayedColumns: string[] = ['Start date', 'End date',  'Status', 'Edit'];
  dataSource = HOLIDAY_DATA;
  holidayList: HolidayType[] = [
    {value: 'all-requests', viewValue: 'All requests'},
    {value: 'rest-holiday', viewValue: 'Rest holidays'},
    {value: 'special-holiday', viewValue: 'Special holiday'},
    {value: 'unpaid-holiday', viewValue: 'Unpaid holiday'}
  ];
  constructor(private holidayService:HolidayService, private cookieService: CookieService, private userService: UserService) { }
  ngOnInit(): void {
    const tk = this.cookieService.get('Token');

    const email: String = parseJwt(tk).username;
    const id: number = parseJwt(tk).id;
    console.log(email);
    this.holidayService.getAllHolidaysById(id).forEach(x => console.log(x));
    // this.holidayService.getAllHolidaysByUser(this.user).subscribe(data => {
    
    //   this.holidays = data;
    //   this.dataSource = new MatTableDataSource<Holiday>(this.holidays);
    //   //this.dataSource.paginator = this.paginator;
    
    // });
  }

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
        this.dataSource = HOLIDAY_DATA;
        break;
      }
      case 'rest-holiday':{
        this.dataSource = HOLIDAY_DATA.filter(holiday=>holiday.type ===RequestType.REST);
        break;
      }
      case 'special-holiday':{
        this.dataSource = HOLIDAY_DATA.filter(holiday=>holiday.type ===RequestType.SPECIAL);
        break;
      }
      case 'unpaid-holiday':{
        this.dataSource = HOLIDAY_DATA.filter(holiday=>holiday.type ===RequestType.UNPAID);
        break;
      }
    }
  }
}




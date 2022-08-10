import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export class HolidayType {
  value?: string;
  viewValue?: string;
  constructor(value: string, viewvalue: string) { }
}
export class Holiday{
  startDate?: Date;
  endDate?: Date;
  status?: string;
  substitute?:string;
  type?:Type;
}
enum Type {
  REST,
  SPECIAL,
  UNPAID
}

// TO DO: move new data type in a separate folder
const HOLIDAY_DATA: Holiday[] =[ 
  {startDate: new Date(1995, 11, 17),endDate: new Date(1995, 11, 17), status: 'Pending', type: Type.REST, substitute: 'Andor' },
  {startDate: new Date(2010, 12, 17),endDate: new Date(2010, 12, 27), status: 'Rejected', type: Type.SPECIAL, substitute: 'Brianna'},
  {startDate: new Date(2022, 8, 17),endDate: new Date(2022, 8, 25), status: 'Approved', type: Type.UNPAID, substitute: 'Tara'},
  {startDate: new Date(2021, 1, 13),endDate: new Date(2021, 2, 1), status: 'Pending', type: Type.REST, substitute: 'Alexandra'}
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
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
        this.dataSource = new MatTableDataSource(HOLIDAY_DATA.filter(holiday => holiday.type === Type.REST));
        this.dataSource.sort = this.sort;
        break;
      }
      case 'special-holiday':{
        this.dataSource = new MatTableDataSource(HOLIDAY_DATA.filter(holiday => holiday.type === Type.SPECIAL));
        this.dataSource.sort = this.sort;
        break;
      }
      case 'unpaid-holiday':{
        this.dataSource = new MatTableDataSource(HOLIDAY_DATA.filter(holiday => holiday.type === Type.UNPAID));
        this.dataSource.sort = this.sort;
        break;
      }
    }
  }
}




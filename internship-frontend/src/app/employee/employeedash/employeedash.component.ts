import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

interface HolidayType {
  value: string;
  viewValue: string;
}
export class Holiday{
  startDate?: string;
  endDate?: string;
  status?: string;
}

const HOLIDAY_DATA: Holiday[] =[ 
  {startDate: '02.03.2021',endDate: '12.03.2021', status: 'Pending'},
  {startDate: '04.05.2022',endDate: '14.05.2022', status: 'Rejected'},
  {startDate: '01.05.2021',endDate: '02.03.2020', status: 'Approved'},
  {startDate: '02.03.2020',endDate: '02.03.2020', status: 'Pending'}
];

@Component({
  selector: 'app-employeedash',
  templateUrl: './employeedash.component.html',
  styleUrls: ['./employeedash.component.scss']
})
export class EmployeedashComponent implements OnInit {
  public vacationdays = 2;

  displayedColumns: string[] = ['Start date', 'End date',  'Status'];
  dataSource = HOLIDAY_DATA;
  holidayList: HolidayType[] = [
    {value: 'all-requests', viewValue: 'All requests'},
    {value: 'rest-holiday', viewValue: 'Rest holidays'},
    {value: 'special-holiday', viewValue: 'Special holiday'},
    {value: 'unpaid-holiday', viewValue: 'Unpaid holiday'}
  ];
  constructor() { }
  ngOnInit(): void {
  }

}

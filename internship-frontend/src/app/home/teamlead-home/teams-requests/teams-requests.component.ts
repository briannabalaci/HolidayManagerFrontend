import { Component, OnInit } from '@angular/core';

export class RequestsTeamMembers {
  name?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

const ELEMENT_DATA: RequestsTeamMembers[] = [
  {name: 'Ana', startDate: '11.08.2022', endDate: '12.09.2022', type: 'Rest holiday'},
  {name: 'Carina', startDate: '11.08.2022', endDate: '12.09.2022', type: 'Special holiday'},
  {name: 'Adrian', startDate: '11.08.2022', endDate: '12.09.2022', type: 'Rest holiday'},
  {name: 'Andrei', startDate: '11.08.2022', endDate: '12.09.2022', type: 'Unpaid holiday'},
]
@Component({
  selector: 'app-teams-requests',
  templateUrl: './teams-requests.component.html',
  styleUrls: ['./teams-requests.component.scss']
})
export class TeamsRequestsComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Start date', 'End date', 'Type', 'Edit'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

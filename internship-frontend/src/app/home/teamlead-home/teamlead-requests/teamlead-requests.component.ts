import { Component, OnInit } from '@angular/core';

class RequestsUser {
  startDate?: string;
  endDate?: string;
  type?: string;
}

const ELEMENT_DATA: RequestsUser[] = [
  {
    startDate: '11.08.2022',
    endDate: '12.09.2022',
    type: 'Rest holiday'
  },
  {
    startDate: '11.08.2022',
    endDate: '12.09.2022',
    type: 'Rest holiday'
  },
  {
    startDate: '11.08.2022',
    endDate: '12.09.2022',
    type: 'Rest holiday'
  },
  {
    startDate: '11.08.2022',
    endDate: '12.09.2022',
    type: 'Rest holiday'
  }
]

@Component({
  selector: 'app-teamlead-requests',
  templateUrl: './teamlead-requests.component.html',
  styleUrls: ['./teamlead-requests.component.scss']
})
export class TeamleadRequestsComponent implements OnInit {

  leftDays = 0;
  requestsTypes: string[] = ['All request', 'Rest holiday', 'Special holiday', 'Unpaid holiday']
  // teamLeadRequests?: RequestsUser[];
  teamLeadRequests = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}

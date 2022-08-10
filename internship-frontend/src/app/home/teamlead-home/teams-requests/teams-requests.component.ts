import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


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
export class TeamsRequestsComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'type', 'edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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
}

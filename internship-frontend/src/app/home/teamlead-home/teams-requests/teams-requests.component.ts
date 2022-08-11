import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TeamleadService} from "../../../service/teamlead.service";
import {Holiday, HolidayStatus, HolidayType} from "../../../shared/data-type/Holiday";
import {User} from "../../../shared/data-type/User";
import {Team} from "../../../shared/data-type/Team";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";


const ELEMENT_DATA: Holiday[] = []
@Component({
  selector: 'app-teams-requests',
  templateUrl: './teams-requests.component.html',
  styleUrls: ['./teams-requests.component.scss']
})
export class TeamsRequestsComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'type', 'edit']
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  user!: User;
  team!: Team;


  typeFilter = new FormControl('');
  nameFilter = new FormControl('');

  filteredValues = {
    name: '', type: ''
  };


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private teamLeadService: TeamleadService, private _liveAnnouncer: LiveAnnouncer) {

  }

  createFilter(): (data: Holiday, filter: string) => boolean {
    return function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.user.surname + " " + data.user.forname).toLowerCase().indexOf(searchTerms.name) !== -1
        && data.type!.toString().toLowerCase().indexOf(searchTerms.type) !== -1
    };
  }

  ngAfterViewInit() {

    this.getTeamLeaderData();

    this.typeFilter.valueChanges.
      subscribe(
        typeFilterValue => {
                // @ts-ignore
                this.filteredValues.type = typeFilterValue;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
             }
         );

    this.nameFilter.valueChanges.
      subscribe(
        nameFilterValue => {
                  // @ts-ignore
                this.filteredValues.name = nameFilterValue;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
            }
        );

  }




  getTeamLeaderData(){
    this.teamLeadService.getUser().subscribe(data => {

      this.user = data;
      this.populateTeamRequests();
    })
  }

  populateTeamRequests(){
    this.teamLeadService.getTeamRequests(this.user!.team!.id!).subscribe(data => {

      this.dataSource = new MatTableDataSource<Holiday>(data);
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = this.createFilter();

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

}

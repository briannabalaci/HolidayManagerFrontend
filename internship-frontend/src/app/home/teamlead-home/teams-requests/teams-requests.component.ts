import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TeamleadService} from "../../../service/teamlead.service";
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../../../shared/data-type/HolidayDto";
import {User} from "../../../shared/data-type/User";
import {Team} from "../../../shared/data-type/Team";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../service/user.service";
import {DetailedRequestComponent} from "./detailed-request/detailed-request.component";
import { HolidayTypeView } from 'src/app/shared/data-type/Holiday';


const ELEMENT_DATA: HolidayDto[] = []

@Component({
  selector: 'app-teams-requests',
  templateUrl: './teams-requests.component.html',
  styleUrls: ['./teams-requests.component.scss']
})
export class TeamsRequestsComponent implements OnInit {


  endDate = 'Angular';
  startDate = 'Angular';
  substitute = '';
  holidayType = HolidayTypeDto.REST_HOLIDAY;
  holidayDeciding = false;
  holidayDecidingId = -1;
  holidayDecidingName = '';
  holidayDecidingDocumentName = '';
  holidayDecidingStartDate = new Date();
  holidayDecidingEndDate = new Date();
  holidayDecidingSubstitute = '';
  holidayDecidingStatus = HolidayStatusDto.PENDING;


  isRequestDeclined(elem: HolidayDto): boolean{
    return elem.status == HolidayStatusDto.DENIED;
  }

  isRequestApproved(elem: HolidayDto): boolean{
    return elem.status == HolidayStatusDto.APPROVED;
  }

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'type', 'edit', 'status']
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  user!: User;
  team!: Team;
  requestsTypes: HolidayTypeView[] = [{ value: '', viewValue: 'All types of requests' }, { value: 'rest', viewValue: 'Rest holiday requests' },
    { value: 'special', viewValue: 'Special holiday requests' },{value:'unpaid', viewValue:'Unpaid holiday requests'}]

  showFormApproveRequest = false;

  typeFilter2 = new FormControl('');
  nameFilter = new FormControl('');

  filteredValues = {
    name: '', type: ''
  };


  @ViewChild(DetailedRequestComponent) detailsRequest: DetailedRequestComponent;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private userService: UserService, private teamLeadService: TeamleadService, private _liveAnnouncer: LiveAnnouncer) {

  }

  refreshData(){
    this.populateTeamRequests();
  }

  get refreshDataFunc() {
    return this.refreshData.bind(this);
  }


  createFilter(): (data: HolidayDto, filter: string) => boolean {
    return function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.user.surname + " " + data.user.forname).toLowerCase().indexOf(searchTerms.name) !== -1
        && data.type!.toString().toLowerCase().indexOf(searchTerms.type) !== -1
    };
  }
  filterByNameAndType(){
    this.nameFilter.valueChanges.subscribe(
      nameFilterValue => {
        // @ts-ignore
        this.filteredValues.name = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );
    this.typeFilter2.valueChanges.subscribe(
      typeFilter2Value => {
        // @ts-ignore
        this.filteredValues.type = typeFilter2Value;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );
  }

  ngOnInit() {

    this.getTeamLeaderData();

    this.filterByNameAndType()

  }


  getTeamLeaderData() {
    this.userService.getUser().subscribe(data => {

      this.user = data;
      this.populateTeamRequests();
    })
  }

  populateTeamRequests() {
    this.teamLeadService.getTeamRequests(this.user!.team!.id!).subscribe(data => {

      this.dataSource = new MatTableDataSource<HolidayDto>(data);
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

  fillFields(element: HolidayDto){
    this.showFormApproveRequest = !this.showFormApproveRequest;
    this.holidayType = element.type!;
    this.holidayDecidingId = element.id!;
    this.holidayDecidingName = element.user.surname + " " + element.user.forname;
    this.holidayDeciding = true;
    this.holidayDecidingStartDate = element.startDate!;
    this.holidayDecidingEndDate = element.endDate!;
    this.holidayDecidingStatus = element.status!;


    if(element.type == HolidayTypeDto.SPECIAL_HOLIDAY){
      this.holidayDecidingDocumentName = element.document!;
      this.holidayDecidingSubstitute = element.substitute!;
    } else if(element.type == HolidayTypeDto.REST_HOLIDAY){
      this.holidayDecidingSubstitute = element.substitute!;
    }

  }

  closeForm(){
    this.showFormApproveRequest = !this.showFormApproveRequest
  }

}

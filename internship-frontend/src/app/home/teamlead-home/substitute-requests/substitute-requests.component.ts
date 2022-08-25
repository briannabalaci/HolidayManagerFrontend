import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../../../shared/data-type/HolidayDto";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {User} from "../../../shared/data-type/User";
import {Team} from "../../../shared/data-type/Team";

import {DetailedRequestComponent} from "../teams-requests/detailed-request/detailed-request.component";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../service/user.service";
import {TeamleadService} from "../../../service/teamlead.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {HolidayService} from "../../../service/holiday.service";
import {saveAs} from "file-saver";



const ELEMENT_DATA: HolidayDto[] = []

@Component({
  selector: 'app-substitute-requests',
  templateUrl: './substitute-requests.component.html',
  styleUrls: ['./substitute-requests.component.scss']
})

export class SubstituteRequestsComponent implements AfterViewInit {

  requestsExists: boolean;

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

  showFormApproveRequest = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  @Input() newNotification:{ message: string }

  constructor(private userService: UserService, private teamLeadService: TeamleadService, private _liveAnnouncer: LiveAnnouncer,
              private holidayService:HolidayService) {

  }

  refreshData(){
    this.getSubstituteData()
  }

  get refreshDataFunc() {
    return this.refreshData.bind(this);
  }

  ngAfterViewInit() {
    this.getSubstituteData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("am ajuns in substitute")
    this.getSubstituteData()
  }

  getSubstituteData() {
    this.holidayService.getSubstituteRequests().subscribe(data => {
      this.dataSource = new MatTableDataSource<HolidayDto>(data);
      this.requestsExists = this.dataSource.data.length > 0;
      this.dataSource.sort = this.sort;
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

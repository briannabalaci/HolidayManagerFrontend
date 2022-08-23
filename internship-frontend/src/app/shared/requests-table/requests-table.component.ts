import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../data-type/HolidayDto";
import {User} from "../data-type/User";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TeamleadService} from "../../service/teamlead.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {UserService} from "../../service/user.service";
import {HolidayService} from "../../service/holiday.service";
import {CreateRequestComponent} from '../create-request/create-request.component';
import {ConfirmationDialogBoxComponent} from 'src/app/confirmation-dialog-box/confirmation-dialog-box.component';
import {MatDialog} from '@angular/material/dialog';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';


const ELEMENT_DATA: HolidayDto[] = []

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss']
})

export class RequestsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['startDate', 'endDate', 'type', 'edit', 'delete']
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @Input() selectedTypeChild: any;
  @Input() selectedStatusChild: any;

  user!: User;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(CreateRequestComponent) requestComponent: CreateRequestComponent;
  @Input()
  parent: any;
  holidays: any;
  @Output() deletedApprovedEvent = new EventEmitter<number>();

  constructor(private holidayService: HolidayService, private userService: UserService, private teamLeadService: TeamleadService, private _liveAnnouncer: LiveAnnouncer, private dialogBox: MatDialog) {
  }

  ngAfterViewInit() {

    this.getTeamLeaderData();

  }


  getTeamLeaderData() {
    this.userService.getUser().subscribe(data => {

      this.user = data;
      this.populateTeamLeadRequests();
    })
  }

  populateTeamLeadRequests() {

      this.teamLeadService.getTeamLeadsRequests(this.user!.id!).subscribe(data => {

      this.dataSource = new MatTableDataSource<HolidayDto>(data);

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

  getStatus(status: any): HolidayStatusDto {
    if (status == 'Pending' || status == 'PENDING') {
      this.selectedStatusChild = HolidayStatusDto.PENDING;
      status = HolidayStatusDto.PENDING;
    } else if (status == 'Approved' || status == 'APPROVED') {
      this.selectedStatusChild = HolidayStatusDto.APPROVED;
      status = HolidayStatusDto.APPROVED;
    } else {
      this.selectedStatusChild = HolidayStatusDto.DENIED;
      status = HolidayStatusDto.DENIED;
    }

    return status
  }

  getType(type: any): HolidayTypeDto {
    if (type == 'Rest holiday' || type == 'REST') {
      this.selectedTypeChild = HolidayTypeDto.REST_HOLIDAY;
      type = HolidayTypeDto.REST_HOLIDAY;
    } else if (type == 'Special holiday' || type == 'SPECIAL') {
      this.selectedTypeChild = HolidayTypeDto.SPECIAL_HOLIDAY;
      type = HolidayTypeDto.SPECIAL_HOLIDAY;
    } else {
      this.selectedTypeChild = HolidayTypeDto.UNPAID_HOLIDAY;
      type = HolidayTypeDto.UNPAID_HOLIDAY;
    }

    return type
  }

  getFilteredByType(type: any) {
    this.holidayService.getRequestsFilteredByType(this.getType(type), this.user!.id!).subscribe(data => {
      this.dataSource.data = data;
      this.selectedTypeChild = type;
    })
  }

  getFilteredByStatus(status: any) {
    this.holidayService.getRequestsFilteredByStatus(this.getStatus(status), this.user!.id!).subscribe(data => {
      this.dataSource.data = data;
      this.selectedStatusChild = status
    })
  }

  getFilteredByStatusAndType(status: any, type: any) {
    this.holidayService.getRequestsFilteredByStatusAndType(this.getStatus(status), this.getType(type), this.user!.id!).subscribe(data => {
      this.dataSource.data = data;
      this.selectedStatusChild = status;
      this.selectedTypeChild = type;
    })
  }

  filterByTypeAndStatus(type: any, status: any): void {
    switch (true) {
      case type == 'All request' && status == 'All':
        this.populateTeamLeadRequests();
        this.selectedTypeChild = 'All request';
        this.selectedStatusChild = 'All';
        break;

      case type != 'All request' && status == 'All':
        this.getFilteredByType(type)
        break;

      case type == 'All request' && status != 'All':
        this.getFilteredByStatus(status)
        break;

      default:
        this.getFilteredByStatusAndType(status, type)
        break;
    }
  }

  filterByType(value: any): void {
    switch (value) {
      case 'All request': {
        this.populateTeamLeadRequests();
        this.selectedTypeChild = null;
        break;
      }
      case 'Rest holiday': {
        this.getFilteredByType(HolidayTypeDto.REST_HOLIDAY);
        this.selectedTypeChild = HolidayTypeDto.REST_HOLIDAY;
        break;
      }
      case 'Special holiday': {
        this.getFilteredByType(HolidayTypeDto.SPECIAL_HOLIDAY);
        this.selectedTypeChild = HolidayTypeDto.SPECIAL_HOLIDAY;
        break;
      }
      case 'Unpaid holiday': {
        this.getFilteredByType(HolidayTypeDto.UNPAID_HOLIDAY);
        this.selectedTypeChild = HolidayTypeDto.UNPAID_HOLIDAY;
        break;
      }
    }
  }

  refreshData() {
    if (this.selectedStatusChild == null && this.selectedTypeChild == null) {
      this.populateTeamLeadRequests();
    } else if (this.selectedStatusChild != null && this.selectedTypeChild == null) {
      this.getFilteredByStatus(this.selectedStatusChild)
    } else if (this.selectedStatusChild == null && this.selectedTypeChild != null) {
      this.getFilteredByType(this.selectedTypeChild)
    } else {
      this.getFilteredByStatusAndType(this.selectedStatusChild, this.selectedTypeChild)
    }
  }

  refreshUserData() {
    this.userService.getUser().subscribe(data => {

      this.user = data;
    })
  }

  fillFields(element: HolidayDto) {
    this.parent.showFormCreateRequest = true;
    this.parent.holidayUpdating = true;
    this.parent.holidayUpdatingId = element.id;
    this.parent.holidayUpdatingStartDate = element.startDate;
    this.parent.holidayUpdatingEndDate = element.endDate;
    this.parent.holidayUpdatingSubstitute = element.substitute;
    if (element.details != null) {
      this.parent.details = element.details;
    } else {
      this.parent.details = '';
    }
    switch (element.type) {
      case HolidayTypeDto.UNPAID_HOLIDAY:
        this.parent.holidayType = 'unpaid-holiday';
        break;
      case HolidayTypeDto.REST_HOLIDAY:
        this.parent.holidayType = 'rest-holiday';
        break;
      case HolidayTypeDto.SPECIAL_HOLIDAY:
        this.parent.holidayType = 'special-holiday';
        break;
    }

  }

  async deleteHoliday(element: HolidayDto) {
    const dialogResponse = this.dialogBox.open(ConfirmationDialogBoxComponent, {
      data: "Are you sure you want to delete this holiday request?"
    });
    dialogResponse.afterClosed().subscribe((response: any) => {
      if (response) {

        this.holidayService.deleteHoliday(element.id).subscribe(data => {
          console.log("Tara2")
          // this.holidays?.forEach( (item: { id: number | undefined; }, index: any) => {
          //   if (item.id === element.id) this.holidays?.splice(index, 1);
          console.log("Tara")
          this.userService.getUser().subscribe(data => {
            console.log("In copil: " + data.nrHolidays)
            this.deletedApprovedEvent.emit(data.nrHolidays);

          });
        })

        this.refreshData();
      }
    })
  }

  applyFilters(selected2: any, selected: any) {
    throw new Error('Method not implemented.');
  }

  selected2(selected2: any, selected: any) {
    throw new Error('Method not implemented.');
  }

  selected(selected2: any, selected: any) {
    throw new Error('Method not implemented.');
  }

}

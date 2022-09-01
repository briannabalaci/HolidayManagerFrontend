import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TeamleadService} from "../../../service/teamlead.service";
import {HolidayDto, HolidayStatusDto, HolidayTypeDto, HolidayTypeUserName} from "../../../shared/data-type/HolidayDto";
import {User} from "../../../shared/data-type/User";
import {Team} from "../../../shared/data-type/Team";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../service/user.service";
import {DetailedRequestComponent} from "./detailed-request/detailed-request.component";
import { HolidayTypeView } from 'src/app/shared/data-type/Holiday';
import { saveAs } from 'file-saver';
import {HolidayService} from "../../../service/holiday.service";



const ELEMENT_DATA: HolidayDto[] = []
export class FileData {
  filename?: string;
  contentType?: string;
  size?: number;
}
@Component({
  selector: 'app-teams-requests',
  templateUrl: './teams-requests.component.html',
  styleUrls: ['./teams-requests.component.scss']
})
export class TeamsRequestsComponent implements OnInit,OnChanges {

  file: FileData;
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
  requestsTypes: HolidayTypeView[] = [{ value: '', viewValue: 'All requests' }, { value: 'rest', viewValue: 'Rest holiday' },
    { value: 'special', viewValue: 'Special holiday' },{value:'unpaid', viewValue:'Unpaid holiday'}]

  showFormApproveRequest = false;
  showPdfMessage = false;
  typeFilter2 = new FormControl('');
  nameFilter = new FormControl('');

  selectedType:any;
  selectedSurname:any;
  selectedForname:any;

  filteredValues = {
    name: '', type: ''
  };


  @ViewChild(DetailedRequestComponent) detailsRequest: DetailedRequestComponent;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table: MatTable<Request>
  @ViewChild('paginator') paginator!: MatPaginator;

  @Input() newNotification:{ message: string }

  constructor(private userService: UserService, private teamLeadService: TeamleadService, private _liveAnnouncer: LiveAnnouncer,
              private holidayService:HolidayService) {

  }
  clearFilter() {
    this.nameFilter.setValue('');
    this.typeFilter2.setValue('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("here in ng on change-------------------------------")
    if (this.newNotification != null)
      if (this.newNotification["message"] != "") {
        this.filterByTypeAndName(this.selectedSurname, this.selectedForname, this.selectedType)
      }
  }

  getType(type: any): HolidayTypeDto {
    if (type == 'Rest holiday' || type == 'rest') {
      this.selectedType = HolidayTypeDto.REST_HOLIDAY;
      type = HolidayTypeDto.REST_HOLIDAY;
    } else if (type == 'Special holiday' || type == 'special') {
      this.selectedType = HolidayTypeDto.SPECIAL_HOLIDAY;
      type = HolidayTypeDto.SPECIAL_HOLIDAY;
    } else if (type == 'Unpaid holiday' || type == 'unpaid'){
      this.selectedType = HolidayTypeDto.UNPAID_HOLIDAY;
      type = HolidayTypeDto.UNPAID_HOLIDAY;
    }
    return type
  }

  refreshData(){
    // if(this.selectedType == undefined && this.selectedForname == undefined && this.selectedSurname == undefined)
    //   this.getTeamLeaderData();
    console.log("In refresh: "+ this.selectedSurname + " "+ this.selectedForname+ " "+ this.selectedType)
    this.filterByTypeAndName(this.selectedSurname, this.selectedForname, this.selectedType)
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


  filterByTypeAndName(surname:string, forname:string, type:HolidayTypeDto){
    const dto : HolidayTypeUserName = {
      type:this.getType(type),
      surname:surname,
      forname:forname,
      teamLeaderId: this.user.id!,
    }
    this.holidayService.filterByTypeAndUserName(dto).subscribe(
      data => {
        this.dataSource.data = data
      }
    )
  }

  onNameChange(name:any){
    let list = name.target.value.split(" ")
    this.selectedSurname = list[0]
    this.selectedForname= list[1]

    let type=null
    let surname = null
    let forname = null
    if(this.selectedType != undefined) type=this.selectedType
    if(this.selectedForname != undefined) forname=this.selectedForname
    if(this.selectedSurname != undefined) surname=this.selectedSurname

    this.filterByTypeAndName(surname, forname, type)
  }

  onTypeChange(type:any){
    this.selectedType = this.getType(type)

    let type1=null
    let surname = null
    let forname = null
    if(this.selectedType != undefined) type1=this.selectedType
    if(this.selectedForname != undefined) forname=this.selectedForname
    if(this.selectedSurname != undefined) surname=this.selectedSurname

    this.filterByTypeAndName(this.selectedSurname, this.selectedForname, this.selectedType)

  }

  ngOnInit() {
    this.getTeamLeaderData();
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

      // this.dataSource.filterPredicate = this.createFilter();

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
    this.holidayDecidingDocumentName = element.document!;


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
  generatePdf() {

    this.showPdfMessage = true;
    console.log("PDF generated");
    this.teamLeadService
    .getPDF(this.user!.team!.id!)
    .subscribe(blob => saveAs(blob,"TeamReport_"+this.user.surname+" "+this.user.forname));
  };

  }



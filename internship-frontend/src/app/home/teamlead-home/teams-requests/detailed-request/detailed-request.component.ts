import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {HolidayService} from "../../../../service/holiday.service";
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../../../../shared/data-type/HolidayDto";
import {TeamleadService} from "../../../../service/teamlead.service";
import {MatDialog} from "@angular/material/dialog";
import { MoreDetailsDialogBoxComponent } from '../more-details-dialog-box/more-details-dialog-box.component';


@Component({
  selector: 'app-detailed-request',
  templateUrl: './detailed-request.component.html',
  styleUrls: ['./detailed-request.component.scss']
})
export class DetailedRequestComponent implements OnInit {

  constructor(private dialogBox:MatDialog, private teamLeadService: TeamleadService, private formBuilder:FormBuilder, private cookieService: CookieService, private holidayService: HolidayService) { }

  holidayRequestFormGroup = this.formBuilder.group({
    name:[""],
    type:[""],
    startDate:[new Date(),Validators.required],
    endDate: [new Date(), Validators.required],
    substitute: [""],
    document:[""],
    documentPdf:[""]
  })


  @Input()
  parent: any;

  @Input() refreshData: Function;
  @Input() deciding: boolean;
  @Input() decidingId: number;
  @Input() decidingStartDate: Date;
  @Input() decidingEndDate: Date;
  @Input() decidingSubstitute: string;
  @Input() decidingType: HolidayTypeDto;
  @Input() decidingName: string;
  @Input() decidingDocumentName: string;
  @Input() decidingStatus: HolidayStatusDto;


  statusRequest: HolidayStatusDto;

  modifiedRequest: HolidayDto;

  documentExists = false;

  showFieldForName = true;
  showFieldForType = true;
  showFieldForStartDate = true;
  showFieldForEndDate = true;
  showFieldForSubstitute = true;
  showFieldForDocument = true;

  isErrorMessage = false;
  isSuccessMessage = false;

  successString: string;
  errorString: string;
  isDisabled = false;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadFields()
    this.holidayRequestFormGroup.patchValue({
      startDate: new Date(this.decidingStartDate),
      endDate: new Date(this.decidingEndDate),
      name: this.decidingName,
      type: this.decidingType
    })

    if(this.decidingType == HolidayTypeDto.SPECIAL_HOLIDAY){
      this.holidayRequestFormGroup.controls['substitute'].setValue(this.decidingSubstitute.toString())
      if(this.decidingDocumentName == null)
        this.holidayRequestFormGroup.controls['document'].setValue("No document attached")
      else
        this.holidayRequestFormGroup.controls['document'].setValue(this.decidingDocumentName.toString())
    } else if(this.decidingType == HolidayTypeDto.REST_HOLIDAY){
      this.holidayRequestFormGroup.controls['substitute'].setValue(this.decidingSubstitute.toString())
    }
  }


  loadFields() {
    if(this.decidingStatus == HolidayStatusDto.DENIED || this.decidingStatus == HolidayStatusDto.APPROVED || this.decidingStatus == HolidayStatusDto.SENT || this.statusRequest == HolidayStatusDto.APPROVED || this.statusRequest == HolidayStatusDto.DENIED ||  this.statusRequest == HolidayStatusDto.SENT) {
      this.isDisabled = true;
    }

    switch(this.decidingType){
      case HolidayTypeDto.REST_HOLIDAY: {
        this.showFieldForName = true;
        this.showFieldForType = true;
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = true;
        this.showFieldForDocument = false;
        break;
      }
      case HolidayTypeDto.SPECIAL_HOLIDAY: {
        this.documentExists = this.decidingDocumentName !== null;
        this.showFieldForName = true;
        this.showFieldForType = true;
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = true;
        this.showFieldForDocument = true;
        break;
      }
      case HolidayTypeDto.UNPAID_HOLIDAY: {
        this.showFieldForName = true;
        this.showFieldForType = true;
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = false;
        this.showFieldForDocument = false;
        break;
      }
    }
  }

  resetWarnings(){
    this.isSuccessMessage = false;
    this.isErrorMessage = false;
  }

  declineRequest(){
    this.teamLeadService.declineRequest(this.decidingId).subscribe(result => {

      this.modifiedRequest = result
      this.statusRequest = this.modifiedRequest.status!
      if (this.modifiedRequest.status == HolidayStatusDto.DENIED) {
        this.isSuccessMessage = true;
        this.isErrorMessage = false;
        this.successString = "Request declined successfully!";
      } else {
        this.isSuccessMessage = false;
        this.isErrorMessage = true;
        this.errorString = "An error occurred while declining the request!";
      }
      this.parent.refreshData();
    })
  }

  approveRequest() {
    if(this.decidingDocumentName == null && this.decidingType == HolidayTypeDto.SPECIAL_HOLIDAY){
      this.isErrorMessage = true;
      this.isSuccessMessage = false;
      this.errorString = "Document missing! Request cannot be approved!";
      return;
    }

    this.teamLeadService.approveRequest(this.decidingId).subscribe(result => {

      this.modifiedRequest = result
      this.statusRequest = this.modifiedRequest.status!
      if (this.modifiedRequest.status == HolidayStatusDto.APPROVED) {
        this.isSuccessMessage = true;
        this.isErrorMessage = false;
        this.successString = "Request approved successfully!";
      } else {
        this.isSuccessMessage = false;
        this.isErrorMessage = true;
        this.errorString = "An error occurred while approving the request!";
      }
      this.parent.refreshData();
    })
  }

  moreDetails(){
    const dialogResponse = this.dialogBox.open(MoreDetailsDialogBoxComponent, {
        data: this.decidingId
      }
    );
    dialogResponse.afterClosed().subscribe(    result => {
      this.parent.refreshData()
    });
  }

  downloadDocument() {

    let binary_string = window.atob(this.decidingDocumentName)
    let len = binary_string.length;
    let bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }

    let blob = new Blob([bytes.buffer], { type: 'application/pdf' })
    let url = URL.createObjectURL(blob);

    window.open(url);

  }

}

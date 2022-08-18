import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {HolidayService} from "../../../../service/holiday.service";
import {HolidayDto, HolidayStatusDto, HolidayTypeDto} from "../../../../shared/data-type/HolidayDto";
import {TeamleadService} from "../../../../service/teamlead.service";
import {ConfirmationDialogBoxComponent} from "../../../../confirmation-dialog-box/confirmation-dialog-box.component";
import {MatDialog} from "@angular/material/dialog";
import {MoreDetailsDialogBoxComponent} from "../more-details-dialog-box/more-details-dialog-box.component";

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
    document:[""]
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


  modifiedRequest: HolidayDto;

  showFillErrorMessage = false;
  showSuccessfulMessage = false;
  showFieldForName = true;
  showFieldForType = true;
  showFieldForStartDate = true;
  showFieldForEndDate = true;
  showFieldForSubstitute = true;
  showFieldForDocument = true;
  isErrorMessage = false;
  successString: string;
  errorString: string;
  isSuccessMessage = false;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetWarnings();
    this.loadFields()
    this.holidayRequestFormGroup.patchValue({
      startDate: new Date(this.decidingStartDate),
      endDate: new Date(this.decidingEndDate),
      name: this.decidingName,
      type: this.decidingType
    })

    if(this.decidingType == HolidayTypeDto.SPECIAL_HOLIDAY){
      this.holidayRequestFormGroup.controls['substitute'].setValue(this.decidingSubstitute.toString())
      this.holidayRequestFormGroup.controls['document'].setValue(this.decidingDocumentName.toString())
    } else if(this.decidingType == HolidayTypeDto.REST_HOLIDAY){
      this.holidayRequestFormGroup.controls['substitute'].setValue(this.decidingSubstitute.toString())
    }
  }


  loadFields() {
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
    if(this.decidingStatus == HolidayStatusDto.DENIED){
      this.isErrorMessage = true;
      this.isSuccessMessage = false;
      this.errorString = "Request already declined!";
      return;
    }
    this.teamLeadService.declineRequest(this.decidingId).subscribe(result => {
      this.modifiedRequest = result
      this.decidingStatus = this.modifiedRequest.status!
      if(this.modifiedRequest.status == HolidayStatusDto.DENIED){
        this.isSuccessMessage = true;
        this.isErrorMessage = false;
        this.successString = "Request declined successfully!";
      }
    })
    this.parent.refreshData();
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
}

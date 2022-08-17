import {AfterViewInit, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {HolidayService} from "../../../../service/holiday.service";
import {HolidayTypeDto} from "../../../../shared/data-type/HolidayDto";

@Component({
  selector: 'app-detailed-request',
  templateUrl: './detailed-request.component.html',
  styleUrls: ['./detailed-request.component.scss']
})
export class DetailedRequestComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private cookieService: CookieService, private holidayService: HolidayService) { }

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



  showFillErrorMessage = false;
  showSuccessfulMessage = false;
  showFieldForName = true;
  showFieldForType = true;
  showFieldForStartDate = true;
  showFieldForEndDate = true;
  showFieldForSubstitute = true;
  showFieldForDocument = true;

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
      this.holidayRequestFormGroup.controls['document'].setValue(this.decidingDocumentName.toString())
    } else if(this.decidingType == HolidayTypeDto.REST_HOLIDAY){
      this.holidayRequestFormGroup.controls['substitute'].setValue(this.decidingSubstitute.toString())
    }
  }

  loadInformation(){
        this.loadFields()
        this.holidayRequestFormGroup.patchValue({
          startDate: this.decidingStartDate,
          endDate: this.decidingEndDate,
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
    this.showFillErrorMessage = false;
    this.showSuccessfulMessage = false;
  }
}

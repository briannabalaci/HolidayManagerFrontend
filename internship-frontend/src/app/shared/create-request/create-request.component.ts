import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';
import { HolidayService } from 'src/app/service/holiday.service';
import { parseJwt } from 'src/app/utils/JWTParser';
import { Holiday, HolidayStatus, HolidayType, RequestType } from '../data-type/Holiday';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  holidayRequestFormGroup = this.formBuilder.group({
    startDate:["",Validators.required],
    endDate: ["", Validators.required],
    substitute: [""],
    document:[""]
  })
  @ViewChild('matRef') matRef!: MatSelect;
  @ViewChild('formDirective') private formDirective!: NgForm;
  @ViewChild('pickerStart', { read: MatInput }) pickerStart!: MatInput;
  @ViewChild('pickerEnd', { read: MatInput }) pickerEnd!: MatInput;

  showFillErrorMessage = false;
  showSuccessfulMessage = false;
  showFieldForStartDate = false;
  showFieldForEndDate = false;
  showFieldForSubstitute = false;
  showFieldForDocument = false;
  deviceValue = '';
  fileName = '';
  holidayList: HolidayType[] = [
    {value: 'rest-holiday', viewValue: 'Rest holiday'},
    {value: 'special-holiday', viewValue: 'Special holiday'},
    {value: 'unpaid-holiday', viewValue: 'Unpaid holiday'}
  ];
  constructor(private formBuilder:FormBuilder, private cookieService: CookieService, private holidayService: HolidayService) { }

  ngOnInit(): void {
  }
  
  onChange(deviceValue: any): void{
    this.deviceValue = deviceValue;
    switch(deviceValue){
      case 'rest-holiday': {
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = true;
        this.showFieldForDocument = false;
        break;
      }
      case 'special-holiday': {
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = true;
        this.showFieldForDocument = true;
        break;
      }
      case 'unpaid-holiday': {
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = false;
        this.showFieldForDocument = false;
        break;
      }
    }
  }
  sendHolidayRequest() {
    const valuesFromForm = this.holidayRequestFormGroup.value;
    let hType = RequestType.REST;
    const token = this.cookieService.get('Token');
    const uID = parseJwt(token).id;
    switch (this.deviceValue) {
      case 'rest-holiday': {
        hType = RequestType.REST;
        break;
      }
      case 'special-holiday': {
        hType = RequestType.SPECIAL;
        break;
      }
      case 'unpaid-holiday': {
        hType = RequestType.UNPAID;
        break;
      }
    }
    console.log(valuesFromForm.startDate);
    const datePipe = new DatePipe('en-US');
    const holidayData:Holiday = {
     // startDate: new Date(valuesFromForm.startDate!),
     // endDate:  new Date(valuesFromForm.endDate!),
    

      start_date: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
      end_date: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
      status: HolidayStatus.PENDING!,
      substitute: valuesFromForm.substitute!,
      type: hType,
      user: {
        id: uID
      }
    }
    this.holidayService.createHoliday(holidayData).subscribe(result => {
      console.log('Holiday created');
      console.log(result);
    });
  }
  verifyHolidayRequest() {
    const valuesFromForm = this.holidayRequestFormGroup.value;
    let anyFieldIsEmpty = false;
    switch (this.deviceValue) {
      case 'rest-holiday': {
        anyFieldIsEmpty = (valuesFromForm.startDate == '' || valuesFromForm.endDate == '' || valuesFromForm.substitute == '');
        break;
      }
      case 'special-holiday': {
        anyFieldIsEmpty = (valuesFromForm.startDate == '' || valuesFromForm.endDate == '' || valuesFromForm.substitute == '' || valuesFromForm.document == '');
        break;
      }
      case 'unpaid-holiday': {
        anyFieldIsEmpty =  (valuesFromForm.startDate == '' || valuesFromForm.endDate == '');
        break;
      }
    }
    if (anyFieldIsEmpty) {
      this.showFillErrorMessage = true;
    } else {
      this.sendHolidayRequest();
      this.showSuccessfulMessage = true;
      this.showFieldForStartDate = false;
      this.showFieldForEndDate = false;
      this.showFieldForSubstitute = false;
      this.showFieldForDocument = false;
      this.clearSelect();
      this.clearFields();
    }
  }
  resetWarnings(){
    this.showFillErrorMessage = false;
    this.showSuccessfulMessage = false;
  }
  
  clearSelect() {
    this.matRef.options.forEach((data: MatOption) => data.deselect());
  }
  clearFields() {
    this.pickerEnd.value = '';
    this.pickerStart.value = '';
}
}

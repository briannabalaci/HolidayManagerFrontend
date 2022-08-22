import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CookieService} from 'ngx-cookie-service';
import {HolidayService} from 'src/app/service/holiday.service';
import {parseJwt} from 'src/app/utils/JWTParser';
import {Holiday, HolidayForUpdate, HolidayStatus, HolidayTypeView, RequestType} from '../data-type/Holiday';
import {DatePipe} from '@angular/common';
import {UserService} from "../../service/user.service";
import { Component, Input, OnInit, Output, SimpleChanges, ViewChild,EventEmitter } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import {User} from "../data-type/User";
import { stringify } from 'querystring';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})

export class CreateRequestComponent implements OnInit {
  holidayRequestFormGroup = this.formBuilder.group({
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
    substitute: [""],
    document: [""]
  })
  @ViewChild('matRef') matRef!: MatSelect;
  @ViewChild('formDirective') private formDirective!: NgForm;
  @Input() refreshData!: Function;
  @Input() updating!: boolean;
  @Input() updatingId!: number;
  @Input() updatingStartDate!: string;
  @Input() updatingEndDate!: string;
  @Input() updatingSubstitute!: string;
  @Input() deviceValue!: string;
  @Input() details!: string;
  @Input() parent: any;
  @Output() newRequest = new EventEmitter<string>()



  userNoHolidays = 0;
  numberDaysRequired = 0;
  unpaidDaysRequired = 0;


  showSuccess = false;
  showError = false;

  stopCreateRequest = false;
  showDateErrorMessage = false;
  showFillErrorMessage = false;
  showNumberHolidaysErrorMessage = false;
  showSuccessfulMessage = false;
  showSuccessfulUpdateMessage = false;
  showFieldForStartDate = false;
  showFieldForEndDate = false;
  showFieldForSubstitute = false;
  showFieldForDocument = false;
  fileName = '';
  holidayList: HolidayTypeView[] = [
    {value: 'rest-holiday', viewValue: 'Rest holiday'},
    {value: 'special-holiday', viewValue: 'Special holiday'},
    {value: 'unpaid-holiday', viewValue: 'Unpaid holiday'}
  ];
  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private holidayService: HolidayService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const idChange = changes['updatingId'];
    if (idChange && idChange.previousValue != idChange.currentValue) {
      if (this.updating) {
        console.log(this.updatingId);
        this.loadFields();
        const datePipe = new DatePipe('en-US');
        if (this.deviceValue != 'unpaid-holiday') {
          this.holidayRequestFormGroup.controls['substitute'].setValue(this.updatingSubstitute.toString());
        }
        this.holidayRequestFormGroup.patchValue({
          startDate: new Date(this.updatingStartDate),
          endDate: new Date(this.updatingEndDate),
        });
      }
    }
  }

  loadFields() {
    switch (this.deviceValue) {
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

  onChange(deviceValue: any): void {
    this.deviceValue = deviceValue;
    this.loadFields();
  }

  file: File | null = null;

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      this.fileName = files.item(0)!.name;
      if (this.file) {
        console.log("File added!");
      }
    }
  }

  // @ts-ignore
  checkAndSend(): any {

    const datePipe = new DatePipe('en-US');

    const valuesFromForm = this.holidayRequestFormGroup.value;

    let startDate = datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!
    let endDate = datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!

    this.userService.getUser().subscribe(result => {
      this.userNoHolidays = result.nrHolidays!
      this.holidayService.getNoHolidays(startDate, endDate).subscribe(result => {
        this.numberDaysRequired = result
        this.unpaidDaysRequired = Math.floor(this.numberDaysRequired/10)
        console.log(this.unpaidDaysRequired + " " + this.numberDaysRequired + " " +this.userNoHolidays)
        if (this.numberDaysRequired > this.userNoHolidays && this.deviceValue == 'rest-holiday') {
          this.showError = true;
          this.showSuccess = false
          this.showMessage()
        } if(this.unpaidDaysRequired > this.userNoHolidays && this.deviceValue == 'unpaid-holiday'){
          console.log(this.deviceValue)
          this.showError = true;
          this.showSuccess = false
          this.showMessage()
        }
        else {
          this.showSuccess = true
          this.showError = false
          this.sendHolidayRequest()
        }

      })
    })
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

    if (this.file && this.deviceValue == 'special-holiday') {
      console.log("It's a special holiday" + this.updating);
      this.file.arrayBuffer().then(buff => {
        let x = new Uint8Array(buff);
        if (!this.updating) {
          const datePipe = new DatePipe('en-US');
          const holidayData: Holiday = {
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            // startDate: 'sfsdgsdgsg',
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
            status: HolidayStatus.PENDING!,
            substitute: valuesFromForm.substitute!,
            type: hType,
            document: Array.from(x),
            user: {
              id: uID
            }
          }


          console.log("currently inserting");
          this.holidayService.createHoliday(holidayData).subscribe(result => {
            // Call parent's function to refresh table.
            this.newRequest.emit("New request created!")
            this.refreshData();
            this.showMessage()
            console.log(result);
          });
        } else {
          const datePipe = new DatePipe('en-US');
          const holidayData: HolidayForUpdate = {
            id: this.updatingId,
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
            substitute: valuesFromForm.substitute!,
            document: Array.from(x)
          }
          console.log("currently updating");
          this.holidayService.updateHoliday(holidayData).subscribe(result => {
            // Call parent's function to refresh table.
            this.refreshData();
            console.log(result);
            if (!this.updating) {
              this.clearSelect();
            } else {
              this.details = '';
              this.updating = false;
            }
          });
        }
      });
    } else {
      if (!this.updating) {
        const datePipe = new DatePipe('en-US');
        let holidayData: Holiday;
        if (this.deviceValue == 'rest-holiday') {
          holidayData = {
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
            status: HolidayStatus.PENDING!,
            substitute: valuesFromForm.substitute!,
            type: hType,
            user: {
              id: uID
            }
          }
        } else {
          holidayData = {
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
            status: HolidayStatus.PENDING!,
            type: hType,
            user: {
              id: uID
            }
          }
        }
        this.holidayService.createHoliday(holidayData).subscribe(result => {
          // Call parent's function to refresh table.
          this.showMessage()
          this.newRequest.emit("New request created!")
          this.refreshData();
          console.log(result);
        });
      } else {
        const datePipe = new DatePipe('en-US');
        let holidayData: HolidayForUpdate;
        if (this.deviceValue == 'rest-holiday' || this.deviceValue == 'special-holiday') {
          holidayData = {
            id: this.updatingId,
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
            substitute: valuesFromForm.substitute!
          }
        } else {
          holidayData = {
            id: this.updatingId,
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!
          }
        }
        this.holidayService.updateHoliday(holidayData).subscribe(result => {
          // Call parent's function to refresh table.
          this.refreshData();
          console.log(result);
          if (!this.updating) {
            this.clearSelect();
          } else {
            this.details = '';
            this.updating = false;
          }
        });
      }
    }
  }

  verifyHolidayRequest() {
    const valuesFromForm = this.holidayRequestFormGroup.value;
    let anyFieldIsEmpty = false;
    switch (this.deviceValue) {
      case 'rest-holiday': {
        anyFieldIsEmpty = (valuesFromForm.startDate == null || valuesFromForm.endDate == null || valuesFromForm.substitute == '');
        break;
      }
      case 'special-holiday': {
        anyFieldIsEmpty = (valuesFromForm.startDate == null || valuesFromForm.endDate == null || valuesFromForm.substitute == '');
        break;
      }
      case 'unpaid-holiday': {
        anyFieldIsEmpty = (valuesFromForm.startDate == null || valuesFromForm.endDate == null);
        break;
      }
    }
    if (anyFieldIsEmpty) {
      this.showFillErrorMessage = true;
    } else if (valuesFromForm.startDate! > valuesFromForm.endDate!) {
      this.showDateErrorMessage = true;
    } else {
      this.resetWarnings();
      this.checkAndSend();
    }
  }

  showMessage() {
    if (this.showSuccess) {
      this.showSuccessfulMessage = true;
      this.showFieldForStartDate = false;
      this.showFieldForEndDate = false;
      this.showFieldForSubstitute = false;
      this.showFieldForDocument = false;
    } else if (this.showError) {
      this.showNumberHolidaysErrorMessage = true;
      this.showFieldForStartDate = false;
      this.showFieldForEndDate = false;
      this.showFieldForSubstitute = false;
      this.showFieldForDocument = false;
    }
  }

  resetWarnings() {
    console.log(this.deviceValue);
    this.showFillErrorMessage = false;
    this.showSuccessfulMessage = false;
    this.showDateErrorMessage = false;
    this.showNumberHolidaysErrorMessage = false;
  }

  clearSelect() {
    this.matRef.options.forEach((data: MatOption) => data.deselect());
    this.updating = false;
    this.details = '';
  }
}

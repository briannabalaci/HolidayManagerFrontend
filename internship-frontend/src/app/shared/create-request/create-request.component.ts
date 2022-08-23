import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CookieService} from 'ngx-cookie-service';
import {HolidayService} from 'src/app/service/holiday.service';
import {parseJwt} from 'src/app/utils/JWTParser';
import {Holiday, HolidayForUpdate, HolidayStatus, HolidayTypeView, RequestType} from '../data-type/Holiday';
import {DatePipe} from '@angular/common';
import {UserService} from "../../service/user.service";
import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {UpdateUser, User} from "../data-type/User";
import {AdminService} from "../../service/admin.service";


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
  @Output() createRequest = new EventEmitter<number>()
  userForUpdate: User;
  requestForUpdate: Holiday;


  userNoHolidays = 0;
  numberDaysRequired = 0;
  unpaidDaysRequired = 0;
  daysToBeTakenOrAdded = 0;
  numberDaysRequiredInitialRequest = 0;
  unpaidDaysRequiredInitialRequest = 0;

  showSuccess = false;
  showError = false;

  stopCreateRequest = false;
  showDateErrorMessage = false;
  showFillErrorMessage = false;
  showNumberHolidaysErrorMessage = false;
  showPastDateErrorMessage = false;
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

      this.userForUpdate = result;

      this.userNoHolidays = result.nrHolidays!

      this.holidayService.getNoHolidays(startDate, endDate).subscribe(result => {

        this.numberDaysRequired = result
        this.unpaidDaysRequired = Math.floor(this.numberDaysRequired / 10)


        if (!this.updating) {

          if (this.numberDaysRequired > this.userNoHolidays && this.deviceValue == 'rest-holiday') {

            this.showError = true;
            this.showSuccess = false
            this.showMessage()

          } else if (this.unpaidDaysRequired > this.userNoHolidays && this.deviceValue == 'unpaid-holiday') {

            this.showError = true;
            this.showSuccess = false
            this.showMessage()

          } else {

            this.showSuccess = true
            this.showError = false
            this.sendHolidayRequest()

          }
        } else {

          this.holidayService.getHoliday(this.updatingId).subscribe(result => {

            let startDateI = datePipe.transform(result.startDate, 'yyyy-MM-dd HH:mm:ss')!
            let endDateI = datePipe.transform(result.endDate, 'yyyy-MM-dd HH:mm:ss')!

            this.holidayService.getNoHolidays(startDateI, endDateI).subscribe(result => {

              this.numberDaysRequiredInitialRequest = result;

              this.daysToBeTakenOrAdded = this.numberDaysRequired - this.numberDaysRequiredInitialRequest;

              if (this.deviceValue == 'rest-holiday') {

                if (this.daysToBeTakenOrAdded > this.userNoHolidays) {

                  this.showError = true;
                  this.showSuccess = false
                  this.showMessage()
                } else {

                  this.showSuccess = true
                  this.showError = false
                  this.showMessage()
                  this.userForUpdate.nrHolidays = this.userNoHolidays - this.daysToBeTakenOrAdded
                  this.sendHolidayRequest()
                  this.userService.updateVacationDays(this.userForUpdate.email!, this.userForUpdate.nrHolidays).subscribe(result => console.log(result))
                }

              } else if (this.deviceValue == 'unpaid-holiday') {

                this.unpaidDaysRequiredInitialRequest = Math.floor(this.numberDaysRequiredInitialRequest / 10);

                this.daysToBeTakenOrAdded = this.unpaidDaysRequired - this.unpaidDaysRequiredInitialRequest;

                if (this.daysToBeTakenOrAdded > this.userNoHolidays) {
                  this.showError = true;
                  this.showSuccess = false
                  this.showMessage()
                } else {

                  this.showSuccess = true
                  this.showError = false
                  this.showMessage()
                  this.userForUpdate.nrHolidays = this.userNoHolidays - this.daysToBeTakenOrAdded
                  this.sendHolidayRequest()
                  this.userService.updateVacationDays(this.userForUpdate.email!, this.userForUpdate.nrHolidays).subscribe(result => console.log(result))
                }
              } else {
                this.showSuccess = true
                this.showError = false
                this.showMessage()
                this.sendHolidayRequest()
              }
            })
          })
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
            this.userService.getUser().subscribe(data => {
              this.createRequest.emit(data.nrHolidays);
             });
            // Call parent's function to refresh table.
            this.newRequest.emit("New request created!");
            this.clearSelect();
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
            this.userService.getUser().subscribe(data => {
              this.createRequest.emit(data.nrHolidays);
             });
            // Call parent's function to refresh table.

            this.refreshData();
            this.showMessage();
            console.log(result);
            this.details = '';
            this.updating = false;
            this.clearSelect();
            this.showSuccess = true;
            this.showError = false;
            this.showMessage();
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
          this.userService.getUser().subscribe(data => {
            this.createRequest.emit(data.nrHolidays);
           });
          // Call parent's function to refresh table.
          this.newRequest.emit("New request created!");
          this.clearSelect();
          this.showMessage();
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
          this.userService.getUser().subscribe(data => {
            this.createRequest.emit(data.nrHolidays);
           });

          this.refreshData();
          this.showMessage();
          console.log(result);
          this.details = '';
          this.updating = false;
          this.clearSelect();
          this.showSuccess = true;
          this.showError = false;
          this.showMessage();
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
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (anyFieldIsEmpty) {
      this.showFillErrorMessage = true;
    } else if (valuesFromForm.startDate! > valuesFromForm.endDate!) {
      this.showDateErrorMessage = true;
    } else if (valuesFromForm.startDate! <= yesterday) {
      this.showPastDateErrorMessage = true;
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
    } else {
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
    this.showPastDateErrorMessage = false;
  }

  clearSelect() {
    this.matRef.options.forEach((data: MatOption) => data.deselect());
    this.updating = false;
    this.details = '';
  }
}

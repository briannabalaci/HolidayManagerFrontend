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
import {User, UserType} from "../data-type/User";
import {HolidayTypeDto} from "../data-type/HolidayDto";


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})

export class CreateRequestComponent implements OnInit {
  holidayRequestFormGroup = this.formBuilder.group({
    startDate: [new Date(new Date().setHours(0,0,0,0)), Validators.required],
    endDate: [new Date(new Date().setHours(0,0,0,0)), Validators.required],
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
  @Input() updatingStatus!: string;
  @Input() deviceValue!: string;
  @Input() isTeamlead!: boolean;
  @Input() details!: string;
  @Input() isTeamlead!: boolean;
  @Input() parent: any;
  @Output() newRequest = new EventEmitter<string>()
  @Output() createRequest = new EventEmitter<number>()


  userForUpdate: User;
  requestForUpdate: Holiday;

  documentExists = false;



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
  showStartedMessage = false;
  showSuccessfulMessage = false;
  showSuccessfulUpdateMessage = false;
  showFieldForStartDate = false;
  showFieldForEndDate = false;
  showFieldForSubstitute = false;
  showFieldForDocument = false;
  showCreateErrorMsg = "";
  showFieldForReplacement = false;
  fileName = '';
  holidayList: HolidayTypeView[] = [
    {value: 'rest-holiday', viewValue: 'Rest holiday'},
    {value: 'special-holiday', viewValue: 'Special holiday'},
    {value: 'unpaid-holiday', viewValue: 'Unpaid holiday'}
  ];
  replacementUserList: User[];
  substitute:User
  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private holidayService: HolidayService, private userService: UserService) {
  }

  ngOnInit(): void {
    if(parseJwt(this.cookieService.get("Token")).type === UserType.TEAMLEAD){
      this.refreshSubstitutes();

    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    const idChange = changes['updatingId'];
    if (idChange && idChange.previousValue != idChange.currentValue) {
      if (this.updating) {

        this.loadFields();
        const datePipe = new DatePipe('en-US');
        if (this.deviceValue != 'unpaid-holiday') {

          this.holidayRequestFormGroup.controls['substitute'].setValue(this.updatingSubstitute.toString());
        }
        this.holidayRequestFormGroup.patchValue({
          startDate: new Date(this.updatingStartDate),
          endDate: new Date(this.updatingEndDate),
        });
        const today = new Date();
        const yesterday = new Date(today);
        //yesterday.setDate(yesterday.getDate() - 1);
        if (new Date(this.updatingStartDate) <= today) {
          this.showStartedMessage = true;
        } else {
          this.showStartedMessage = false;
        }
      }
    }

  }
  onReplacementClick(user:User){
    this.substitute = user
  }
  refreshSubstitutes() {
    const token = this.cookieService.get('Token');
    if (token) {
      const parsed = parseJwt(token);
      this.userService.getUserSubstitutes(parsed.id).subscribe(data => {
        this.replacementUserList = data;
      })
    }
  }
  downloadDocument() {

    this.holidayService.getHoliday(this.updatingId).subscribe(result => {

      let binary_string = window.atob(result.document!)

      let len = binary_string.length;


      let bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }

      let blob = new Blob([bytes.buffer], { type: 'application/pdf' })
      let url = URL.createObjectURL(blob);

      window.open(url);

    })
  }

  loadFields() {
    switch (this.deviceValue) {
      case 'rest-holiday': {
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = true;
        this.showFieldForDocument = false;
        if(this.isTeamlead) {
          this.showFieldForReplacement = true;
        }
        this.documentExists = false;
        break;
      }
      case 'special-holiday': {
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = true;
        this.showFieldForDocument = true;
        if (this.isTeamlead) {
          this.showFieldForReplacement = true;
        }
        this.documentExists = true;
        break;
      }
      case 'unpaid-holiday': {
        this.showFieldForStartDate = true;
        this.showFieldForEndDate = true;
        this.showFieldForSubstitute = false;
        this.showFieldForDocument = false;
        if (this.isTeamlead) {
          this.showFieldForReplacement = true;
        }
        this.documentExists = false;
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

  checkAndCreateRequest(type: HolidayTypeDto, startDate: string, endDate: string){
    this.holidayService.checkAndCreateRequest(parseJwt(this.cookieService.get("Token")).username, type, startDate, endDate).subscribe(result => {
      console.log(result)
      if (result > 0) {
        this.holidayService.checkDateOverlap(parseJwt(this.cookieService.get("Token")).username, startDate, endDate).subscribe(result => {
          console.log(result)
          if (result > 0) {
            this.showSuccess = true
            this.showError = false
            this.sendHolidayRequest()
          } else {
            this.showError = true;
            this.showSuccess = false
            this.showCreateErrorMsg = "You already have a request in the given period.";
            this.showMessage()
          }
        })
      } else {
        this.showError = true;
        this.showSuccess = false
        this.showCreateErrorMsg = "You don't have enough vacation days.";
        this.showMessage()
      }
    })
  }

  checkAndUpdateRequest(type: HolidayTypeDto, startDate: string, endDate: string){
    this.holidayService.checkAndUpdateRequest(parseJwt(this.cookieService.get("Token")).username, type, startDate, endDate, this.updatingId).subscribe(result => {
      console.log(result)
      if(result > 0){
        this.holidayService.checkDateOverlapUpdate(parseJwt(this.cookieService.get("Token")).username, startDate, endDate, this.updatingId).subscribe(result => {
          console.log(result)
          if (result > 0) {
            this.showSuccess = true
            this.showError = false
            this.sendHolidayRequest()
          } else {
            this.showError = true;
            this.showSuccess = false
            this.showCreateErrorMsg = "You already have a request in the given period.";
            this.showMessage()
          }
        })
      } else {
        this.showError = true;
        this.showSuccess = false
        this.showCreateErrorMsg = "You don't have enough vacation days.";
        this.showMessage()
      }
    })
  }

  // @ts-ignore
  checkAndSend(): any {

    const datePipe = new DatePipe('en-US');

    const valuesFromForm = this.holidayRequestFormGroup.value;

    let startDate = datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!
    let endDate = datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!

    if(!this.updating) {

      let type;
      if (this.deviceValue == 'special-holiday') {
        this.holidayService.checkDateOverlap(parseJwt(this.cookieService.get("Token")).username, startDate, endDate).subscribe(result => {
          console.log(result)
          if (result > 0) {
            this.showSuccess = true
            this.showError = false
            this.sendHolidayRequest()
          } else {
            this.showError = true;
            this.showSuccess = false
            this.showCreateErrorMsg = "You already have a request in the given period.";
            this.showMessage()
          }
        })
      }
      else if (this.deviceValue == 'unpaid-holiday') {

        this.checkAndCreateRequest(HolidayTypeDto.UNPAID_HOLIDAY, startDate, endDate)

      }
      else {

        this.checkAndCreateRequest(HolidayTypeDto.REST_HOLIDAY, startDate, endDate)

      }
    } else {

      if (this.deviceValue == 'special-holiday') {
        this.holidayService.checkDateOverlapUpdate(parseJwt(this.cookieService.get("Token")).username, startDate, endDate, this.updatingId).subscribe(result => {
          console.log(result)
          if (result > 0) {
            this.showSuccess = true
            this.showError = false
            this.sendHolidayRequest()
          } else {
            this.showError = true;
            this.showSuccess = false
            this.showCreateErrorMsg = "You already have a request in the given period.";
            this.showMessage()
          }
        })
      }
      else if (this.deviceValue == 'unpaid-holiday') {

        this.checkAndUpdateRequest(HolidayTypeDto.UNPAID_HOLIDAY, startDate, endDate)

      }
      else {

        this.checkAndUpdateRequest(HolidayTypeDto.REST_HOLIDAY, startDate, endDate)

      }
    }
  }

  sendHolidayRequest() {

    if(this.substitute === undefined) {
      this.substitute = new User();
      this.substitute.id = -1;
    }

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

    if (this.deviceValue == 'special-holiday') {
      if(this.file){
        this.file.arrayBuffer().then(buff => {
          let x = new Uint8Array(buff);
          if (!this.updating) {
            const datePipe = new DatePipe('en-US');
            const holidayData: Holiday = {
              startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
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
            let subs
            if(this.substitute == undefined) subs=-1
            else subs = this.substitute.id
            this.holidayService.createHoliday(holidayData, subs!).subscribe(result => {
              this.userService.getUser().subscribe(data => {
                this.createRequest.emit(data.nrHolidays);
              });
              // Call parent's function to refresh table.
              this.userService.getUser().subscribe(data => {
                this.createRequest.emit(data.nrHolidays);
              });
              this.newRequest.emit("New request created!");
              this.clearSelect();
              this.refreshData();
              this.showMessage()
              console.log(result);
            });
          } else {
            const datePipe = new DatePipe('en-US');
            const holidayData: Holiday = {
              id: this.updatingId,
              startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
              endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
              substitute: valuesFromForm.substitute!,
              document: Array.from(x),
              user: {
                id: uID
              }
            }
            console.log("currently updating");
            let subs
            if(this.substitute == undefined) subs=-1
            else subs = this.substitute.id
            this.holidayService.updateHoliday(holidayData,subs!).subscribe(result => {
              this.userService.getUser().subscribe(data => {
                this.createRequest.emit(data.nrHolidays);
                this.newRequest.emit("New request created!")

              });
              // Call parent's function to refresh table.

              this.refreshData();
              this.showMessage();
              console.log(result);

              this.details = '';
              this.updating = false;
              // this.clearSelect();
              this.showSuccess = true;
              this.showError = false;
              this.showMessage();

            });
          }
        });
      } else {
          if (!this.updating) {
            const datePipe = new DatePipe('en-US');
            console.log(valuesFromForm.substitute!)
            const holidayData: Holiday = {
              startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
              endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
              status: HolidayStatus.PENDING!,
              substitute: valuesFromForm.substitute!,
              type: hType,
              document: [],
              user: {
                id: uID
              }
            }

            console.log("currently inserting");
            let subs
            if(this.substitute == undefined) subs=-1
            else subs = this.substitute.id
            this.holidayService.createHoliday(holidayData, subs!).subscribe(result => {
              this.userService.getUser().subscribe(data => {
                this.createRequest.emit(data.nrHolidays);
              });
              // Call parent's function to refresh table.
              this.userService.getUser().subscribe(data => {
                this.createRequest.emit(data.nrHolidays);
              });
              this.newRequest.emit("New request created!");
              this.clearSelect();
              this.refreshData();
              this.showMessage()
              console.log(result);
            });
          } else {
            const datePipe = new DatePipe('en-US');
            const holidayData: Holiday = {
              id: this.updatingId,
              startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
              endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
              substitute: valuesFromForm.substitute!,
              document: [],
              user: {
                id: uID
              }
            }
            console.log("currently updating");
            let subs
            if(this.substitute == undefined) subs=-1
            else subs = this.substitute.id
            this.holidayService.updateHoliday(holidayData,subs!).subscribe(result => {
              this.userService.getUser().subscribe(data => {
                this.createRequest.emit(data.nrHolidays);
                this.newRequest.emit("New request created!")

              });
              // Call parent's function to refresh table.

              this.refreshData();
              this.showMessage();
              console.log(result);

              this.details = '';
              this.updating = false;
              // this.clearSelect();
              this.showSuccess = true;
              this.showError = false;
              this.showMessage();

            });
          }
      }

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
        let subs
        if(this.substitute == undefined) subs=-1
        else subs = this.substitute.id
        this.holidayService.createHoliday(holidayData,subs!).subscribe(result => {
          this.userService.getUser().subscribe(data => {
            this.createRequest.emit(data.nrHolidays);
          });
          // Call parent's function to refresh table.
          this.userService.getUser().subscribe(data => {
            this.createRequest.emit(data.nrHolidays);
           });
          this.newRequest.emit("New request created!");
          this.clearSelect();
          this.showMessage();
          this.refreshData();
          console.log(result);
        });
      } else {
        const datePipe = new DatePipe('en-US');
        let holidayData: Holiday;
        if (this.deviceValue == 'rest-holiday' || this.deviceValue == 'special-holiday') {
          holidayData = {
            id: this.updatingId,
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
            substitute: valuesFromForm.substitute!,
            user: {
              id: uID
            }
          }
        } else {
          holidayData = {
            id: this.updatingId,
            startDate: datePipe.transform(valuesFromForm.startDate, 'yyyy-MM-dd HH:mm:ss')!,
            endDate: datePipe.transform(valuesFromForm.endDate, 'yyyy-MM-dd HH:mm:ss')!,
            user: {
              id: uID
            }
          }
        }
        let subs
        if(this.substitute == undefined) subs=-1
        else subs = this.substitute.id
        this.holidayService.updateHoliday(holidayData,subs!).subscribe(result => {

          this.userService.getUser().subscribe(data => {
            this.createRequest.emit(data.nrHolidays);
            this.newRequest.emit("New request created!")

          });
          this.refreshData();
          this.showMessage();
          console.log(result);
          this.details = '';
          this.updating = false;
          //this.clearSelect();
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
      console.log(valuesFromForm.startDate);
      console.log(valuesFromForm.endDate);
      this.showDateErrorMessage = true;
    } else if (valuesFromForm.startDate! <= yesterday) {
      this.showPastDateErrorMessage = true;
    } else {
      this.resetWarnings();
      this.checkAndSend();
    }
  }
  sendToHr() {
    console.log("Sent to HR!");
  }
  showMessage() {
    if (this.showSuccess) {
      this.showSuccessfulMessage = true;
      this.showFieldForStartDate = false;
      this.showFieldForEndDate = false;
      this.showFieldForSubstitute = false;
      this.showFieldForDocument = false;
      this.showFieldForReplacement = false;
      this.documentExists = false;
    } else {
      this.showNumberHolidaysErrorMessage = true;
      this.showFieldForStartDate = false;
      this.showFieldForEndDate = false;
      this.showFieldForSubstitute = false;
      this.showFieldForDocument = false;
      this.showFieldForReplacement = false;
      this.documentExists = false;
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

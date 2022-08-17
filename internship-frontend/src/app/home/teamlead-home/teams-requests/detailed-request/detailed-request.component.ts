import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {HolidayService} from "../../../../service/holiday.service";

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
    startDate:["",Validators.required],
    endDate: ["", Validators.required],
    substitute: [""],
    document:[""]
  })

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


  resetWarnings(){
    this.showFillErrorMessage = false;
    this.showSuccessfulMessage = false;
  }
}

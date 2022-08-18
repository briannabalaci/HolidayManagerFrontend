import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HolidayDto} from "../../../../shared/data-type/HolidayDto";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {Validators} from "@angular/forms";
import {TeamleadService} from "../../../../service/teamlead.service";
import {HttpContext} from "@angular/common/http";
import {DetailedRequestComponent} from "../detailed-request/detailed-request.component";
import {TeamsRequestsComponent} from "../teams-requests.component";

@Component({
  selector: 'app-more-details-dialog-box',
  templateUrl: './more-details-dialog-box.component.html',
  styleUrls: ['./more-details-dialog-box.component.scss']
})

export class MoreDetailsDialogBoxComponent implements OnInit {

  constructor(public teamLeadService: TeamleadService, public matDialog:MatDialog, public dialogRef: MatDialogRef<MoreDetailsDialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public id: any) { }

  onYesClick() {
    // @ts-ignore
    this.teamLeadService.moreDetailsRequest(this.id, document.getElementById("details").value).subscribe(result => console.log(result))

    this.dialogRef.close(true)
  }

  onCancelClick() {
    this.dialogRef.close(false)
  }

  ngOnInit(): void {
  }

}

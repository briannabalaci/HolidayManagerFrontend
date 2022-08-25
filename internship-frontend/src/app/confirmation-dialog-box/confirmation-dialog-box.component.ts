import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-box',
  templateUrl: './confirmation-dialog-box.component.html',
  styleUrls: ['./confirmation-dialog-box.component.scss']
})
export class ConfirmationDialogBoxComponent implements OnInit {

  constructor(public matDialog:MatDialog, public dialogRef: MatDialogRef<ConfirmationDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmationMessage: boolean) {
    
     }

  ngOnInit(): void {
  }

  onCancelClick(){
    this.dialogRef.close(false)
  }
  onYesClick(){
    this.dialogRef.close(true)
  }
}

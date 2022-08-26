import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogBoxComponent } from '../confirmation-dialog-box/confirmation-dialog-box.component';

@Component({
  selector: 'app-message-dialog-box',
  templateUrl: './message-dialog-box.component.html',
  styleUrls: ['./message-dialog-box.component.scss']
})
export class MessageDialogBoxComponent implements OnInit {

  constructor(public matDialog:MatDialog, public dialogRef: MatDialogRef<ConfirmationDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmationMessage: boolean) {
    
     }

   hideYes=false;
  ngOnInit(): void {
  }

  onCancelClick(){
    this.dialogRef.close(false)
  }
  onYesClick(){
    this.dialogRef.close(true)
  }

}

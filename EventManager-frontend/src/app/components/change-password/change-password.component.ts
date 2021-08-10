import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordFormGroup = this.formBuilder.group({
    old_password: ['', Validators.required],
    new_password: ['', Validators.required],
    new_password2: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
    if (this.changePasswordFormGroup.status === "VALID"){
      if(this.changePasswordFormGroup.value.new_password !== this.changePasswordFormGroup.value.new_password2)
        this.dialog.open(MessageComponent, {data: { message: "Retyped different password!", component: "login"}});
      else
      {

      }
    }
    this.changePasswordFormGroup.reset();
  }

  cancel(): void{
    this.changePasswordFormGroup.reset();
  }

}

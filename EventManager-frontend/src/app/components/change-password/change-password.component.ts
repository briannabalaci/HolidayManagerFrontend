import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from 'src/app/shared/data-types/userDto';
import { UserService } from 'src/app/shared/services/user.service';
import { MessageComponent } from '../message/message.component';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

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

  constructor(private _location: Location,private formBuilder: FormBuilder, private dialog: MatDialog, private userService: UserService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
    if (this.changePasswordFormGroup.status === "VALID"){
      if(this.changePasswordFormGroup.value.new_password !== this.changePasswordFormGroup.value.new_password2)
        this.dialog.open(MessageComponent, {data: { message: "Retyped different password!", component: "login"}});
      else
      {
        let userDto = new UserDto();
        const token = sessionStorage.getItem('token');
        const email = jwt_decode<any>(token || ' ').email;
        userDto.email = email;
        userDto.password = btoa(this.changePasswordFormGroup.value.old_password);
        userDto.newPassword = btoa(this.changePasswordFormGroup.value.new_password);

        console.log(userDto);
        this.userService.changePassword(userDto).subscribe(data => {
          console.log(data);
        });
        sessionStorage.clear();
        this.route.navigate(['login']);
      }
    }
    this.changePasswordFormGroup.reset();
  }

  cancel(): void{
    this.changePasswordFormGroup.reset();
    this._location.back();
  }

}

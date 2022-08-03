import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import { ChangePasswordService, UserChangePasswordData } from 'src/app/service/change-password.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginFormComponent } from '../login-form/login-form.component';
@Component({
  selector: 'app-login-reset-form',
  templateUrl: './login-reset-form.component.html',
  styleUrls: ['./login-reset-form.component.scss']
})
export class LoginResetFormComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  hide3 = true;
  showFormLogin = false;
  showPasswordErrorString = false;
  showPasswordSameString = false;
  showEmailErrorString = false;
  loginChangePasswordFormGroup = this.formBuilder.group({
    email:["",Validators.required],
    oldPassword:["",Validators.required],
    newPassword:["",Validators.required],
    newPassword2:["",Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private userChangePasswordService : ChangePasswordService, private route:AppRoutingModule) { }

  ngOnInit(): void {
  }
  changeUserPassword(){
    const valuesFromForm = this.loginChangePasswordFormGroup.value;
    if(valuesFromForm.newPassword2 != valuesFromForm.newPassword){
      this.showPasswordErrorString = true;
    } else if(valuesFromForm.oldPassword == valuesFromForm.newPassword ){
      this.showPasswordSameString = true;
    } else {
      const changeData:UserChangePasswordData = {
        email:valuesFromForm.email!,
        oldPassword:valuesFromForm.oldPassword!,
        newPassword:valuesFromForm.newPassword!
      }
      this.userChangePasswordService.changeData(changeData).subscribe(result => {
        if(result === 'Email or password incorrect!') {
          this.showEmailErrorString = true;
        } else {
          window.location.href = '/login';
        }
      })
    }
  }
}

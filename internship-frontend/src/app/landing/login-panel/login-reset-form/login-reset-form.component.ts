import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import { ChangePasswordService, UserChangePasswordData } from 'src/app/service/change-password.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginFormComponent } from '../login-form/login-form.component';
import {Router} from "@angular/router";

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
  showPasswordEmptyString = false;
  showSuccesfulPasswordMessage = false;
  loginChangePasswordFormGroup = this.formBuilder.group({
    email:["",Validators.required],
    oldPassword:["",Validators.required],
    newPassword:["",Validators.required],
    newPassword2:["",Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private userChangePasswordService : ChangePasswordService, private router: Router) { }

  ngOnInit(): void {
  }
  changeUserPassword(){
    const valuesFromForm = this.loginChangePasswordFormGroup.value;
    if(valuesFromForm.email === '' || valuesFromForm.oldPassword === '' || valuesFromForm.newPassword2 === '' || valuesFromForm.newPassword === '') {
      this.showPasswordEmptyString = true;
    } else if(valuesFromForm.newPassword2 != valuesFromForm.newPassword){
      this.showPasswordErrorString = true;
    } else if(valuesFromForm.oldPassword == valuesFromForm.newPassword){
        this.showPasswordSameString = true;
    } else {
      const changeData:UserChangePasswordData = {
        email:valuesFromForm.email!,
        oldPassword:valuesFromForm.oldPassword!,
        newPassword:valuesFromForm.newPassword!
      }
      this.userChangePasswordService.changeData(changeData).subscribe(result => {
        if(result === 'Invalid password or email') {
          this.showEmailErrorString = true;
        } else {
          this.showSuccesfulPasswordMessage = true;
        }
      })
    }
  }
  resetWarnings(){
    this.showPasswordErrorString = false;
    this.showPasswordSameString = false;
    this.showEmailErrorString = false;
    this.showPasswordEmptyString = false;
    this.showSuccesfulPasswordMessage = false;
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import { ChangePasswordService, UserChangePasswordData } from 'src/app/service/change-password.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-reset-form',
  templateUrl: './login-reset-form.component.html',
  styleUrls: ['./login-reset-form.component.scss']
})
export class LoginResetFormComponent implements OnInit {
  hidePasswordOld = true;
  hidePasswordNew1 = true;
  hidePasswordNew2 = true;
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
    const emailIsEmpty = (valuesFromForm.email === '');
    const newPasswordsDoNotMatch = (valuesFromForm.newPassword2 != valuesFromForm.newPassword);
    const newPasswordIsSame = (valuesFromForm.oldPassword == valuesFromForm.newPassword);
    const anyPasswordIsEmpty = (valuesFromForm.oldPassword === '' || valuesFromForm.newPassword2 === '' || valuesFromForm.newPassword === '');
    if(emailIsEmpty || anyPasswordIsEmpty) {
      this.showPasswordEmptyString = true;
    } else if(newPasswordsDoNotMatch){
      this.showPasswordErrorString = true;
    } else if(newPasswordIsSame){
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

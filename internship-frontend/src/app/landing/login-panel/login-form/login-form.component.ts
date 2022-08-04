import { Component, OnInit } from '@angular/core';
import {UserLoginData, UserService} from "../../../service/user.service";
import {FormBuilder, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  hide = true;
  showSuccesfulPasswordMessage = false;
  loginUserDataFormGroup = this.formBuilder.group({
    email:["",Validators.required],
    password:["",Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
  }

  loginUser(){
    const valuesFromForm = this.loginUserDataFormGroup.value;

    const loginData:UserLoginData = {
      email:valuesFromForm.email!,
      password:valuesFromForm.password!
    }
    console.log(loginData.email+" "+loginData.password)
    this.userService.login(loginData).subscribe(result => {
      if (result == "Logged in successfully!"){
        alert("Logged in successfully!")
      }
      else {
          alert("Failed to login! Wrong credentials!")
      }
    })
  }
  resetWarnings(){
    this.showSuccesfulPasswordMessage = false;
  }
}

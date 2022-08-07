import { Component, OnInit } from '@angular/core';
import { UserService} from "../../../service/user.service";
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {UserLoginData} from "../../../shared/data-type/UserLoginData";

import {Router} from "@angular/router";
import { UserType } from 'src/app/shared/data-type/User';





@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  hidePassword = true;
  showPasswordErrorMessage = false;
  loginUserDataFormGroup = this.formBuilder.group({
    email:["",Validators.required],
    password:["",Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private userService : UserService,private router: Router) { }

  ngOnInit(): void {
  }
  resetWarnings(){
    this.showPasswordErrorMessage = false;
  }
  loginUser(){
    const valuesFromForm = this.loginUserDataFormGroup.value;
  
    const loginData:UserLoginData = {
      email:valuesFromForm.email!,
      password:valuesFromForm.password!
    }
    console.log(loginData.email+" "+loginData.password)
    this.userService.login(loginData).subscribe(result => {
      console.log(result);
     document.cookie = "Token = "+result['token']+"; path=/";
      if(result == null) this.showPasswordErrorMessage = true;
      else
      {
        // @ts-ignore
        const type:UserType = result["type"]
        if(type == UserType.ADMIN){
          alert("Este admin")
          this.router.navigate(['/admin'])
        }
        else if(type == UserType.EMPLOYEE){
          alert("Este employee")
          this.router.navigate(['/employee'])
        }
        else if(type == UserType.TEAMLEAD){
          alert("Este teamlead")
          this.router.navigate(['/teamlead'])
        }
      }
    })
  }

}

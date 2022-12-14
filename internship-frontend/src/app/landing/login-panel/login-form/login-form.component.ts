import { Component, OnInit } from '@angular/core';
import { UserService} from "../../../service/user.service";
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {UserLoginData} from "../../../shared/data-type/UserLoginData";
import {Router} from "@angular/router";
import {parseJwt} from "../../../utils/JWTParser";
import { CookieService } from 'ngx-cookie-service';
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
  constructor(private formBuilder:FormBuilder, private userService : UserService,private router: Router, private cookieService: CookieService) { }

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
    console.log(loginData.email + " " + loginData.password)
    if (!this.loginUserDataFormGroup.invalid) {
      this.userService.login(loginData).subscribe(result => {
        console.log("Result:");
        console.log(result);
        if (result['token'] == '') this.showPasswordErrorMessage = true;
        else {
          this.cookieService.set('Token', result['token']);
          // @ts-ignore
          const type: UserType = parseJwt(result.token).type;
          const email: String = parseJwt(result.token).username;
          if (type == UserType.ADMIN) {
            this.router.navigate(['/admin']);
          }
          else if (type == UserType.EMPLOYEE) {
            this.router.navigate(['/employee']);
          }
          else if (type == UserType.TEAMLEAD) {
            this.router.navigate(['/teamlead']);
          }
        }
      })
    }
  }

}

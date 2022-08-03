import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import { UserService } from 'src/app/service/user.service';

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
  loginChangePasswordFormGroup = this.formBuilder.group({
    email:["",Validators.required],
    password_old:["",Validators.required],
    password_new_1:["",Validators.required],
    password_new_2:["",Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
  }

}

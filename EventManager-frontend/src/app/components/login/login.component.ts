import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/data-types/user';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form =  this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,private logInService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
      let user = new User();
      user.email = this.form.value.username;
      user.password = this.form.value.password;
      this.logInService.checkUser(user);
  }

}

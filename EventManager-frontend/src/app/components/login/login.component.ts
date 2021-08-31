import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/data-types/user';
import { LoginService } from '../../shared/services/login.service';
import { MessageComponent } from '../message/message.component';
import jwt_decode from 'jwt-decode';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  error: boolean = false;

  errorMessage: string = " ";

  constructor(private formBuilder: FormBuilder, private logInService: LoginService, private router: Router, private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let user = new User();
    user.email = this.form.value.username;
    user.password = btoa(this.form.value.password);
    this.error = false;
    this.logInService.checkUser(user).subscribe(data => {
      sessionStorage.setItem('token', data);
      console.log(jwt_decode<any>(data));
      const role = jwt_decode<any>(data).roles[0];
      console.log(role);

      switch (role) {
        case 'ADMIN':
          this.activatedRoute.queryParams.subscribe(params => {
            console.log(params);
            if (params.redirectTo) {
              this.router.navigateByUrl(`${params.redirectTo}`);
            }
            else {
              this.router.navigate(['user-admin']);
            }
          });

          break;
        case 'ORGANIZER':
        case 'ATTENDEE':
          this.activatedRoute.queryParams.subscribe(params => {
            console.log(params);
            if (params.redirectTo) {
              this.router.navigateByUrl(`${params.redirectTo}`);
            }
            else {
              this.router.navigate(['dashboard']);
            }
          });
          break;
      }
      this.form.reset();
      Object.keys(this.form.controls).forEach(key =>
        this.form.controls[key].setErrors(null));


    }, err => {
      this.error = true;

      this.errorMessage = err.error;

      this.form.reset();

    })

  };


  getErrorMessage(): string {
    return this.errorMessage;
  }
}




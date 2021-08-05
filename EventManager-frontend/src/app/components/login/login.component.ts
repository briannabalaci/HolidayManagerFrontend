import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/data-types/user';
import { LoginService } from '../../shared/services/login.service';
import { MessageComponent } from '../message/message.component';

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

  constructor(private formBuilder: FormBuilder,private logInService: LoginService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
      let user = new User();
      user.email = this.form.value.username;
      user.password = this.form.value.password;
      this.logInService.checkUser(user).subscribe(data => 
        {
          
          switch(data.role) {
            case 'admin':
              this.router.navigate(['user-admin']);
              break;
            case 'organizer':
            case 'attendee':
              sessionStorage.setItem('role',data.role);
              this.router.navigate(['dashboard']);
              break;
          }
          

        }, err => {this.dialog.open(MessageComponent, { data: {
          message: err.error
        }})});
  }

}

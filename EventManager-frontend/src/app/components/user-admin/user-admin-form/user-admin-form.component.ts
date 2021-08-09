import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/data-types/user';
import { EventEmitter } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../message/message.component';


@Component({
  selector: 'app-user-admin-form',
  templateUrl: './user-admin-form.component.html',
  styleUrls: ['./user-admin-form.component.scss']
})
export class UserAdminFormComponent implements OnInit {

  @Output() userEmitter = new EventEmitter<User>();

  userFormGroup = this.formBuilder.group({
    forename: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
    department: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              private service: UserService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createUser() {
    const user = this.userFormGroup.value;

    const usr: User = {
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
      department: user.department
    }
    this.userEmitter.emit(usr);
  }

}

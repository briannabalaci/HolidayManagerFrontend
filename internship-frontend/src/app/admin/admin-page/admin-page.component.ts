import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/data-type/User';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  inputValue = " ";
  userUpdateDto!: User;
  showUserForm = false;
  constructor() { }

  ngOnInit(): void {
  }
  updateTable() { this.inputValue += "a"; }
  updateUser(user: User) {
    this.showUserForm = true;
    console.log("admin.page.component",user)
    this.userUpdateDto = user;
  }
  showForm() {
    this.showUserForm = !this.showUserForm;
  }
}

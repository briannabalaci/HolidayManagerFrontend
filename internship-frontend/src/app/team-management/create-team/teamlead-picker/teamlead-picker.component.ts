import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {FormControl} from "@angular/forms";
import {Department, Role, User, UserType} from "../../../shared/data-type/User";
import {UserService} from "../../../service/user.service";
import {Team} from "../../../shared/data-type/Team";

@Component({
  selector: 'app-teamlead-picker',
  templateUrl: './teamlead-picker.component.html',
  styleUrls: ['./teamlead-picker.component.scss']
})
export class TeamleadPickerComponent implements OnInit {

  constructor() { }

  @Input() users: User[];
  @Output() chooseTeamLeader = new EventEmitter<String>();

  public userControl: FormControl = new FormControl();
  public userFilteredControl: FormControl = new FormControl();
  public filteredUsers: ReplaySubject<any> = new ReplaySubject(1);

  protected _onDestroy = new Subject();


  ngOnInit() {
    this.userControl.setValue(this.users[1]);

    this.filteredUsers.next(this.users.slice());

    this.userFilteredControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsers();
      });
  }


  protected filterUsers() {
    if (!this.users) {
      return;
    }

    let search = this.userFilteredControl.value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredUsers.next(
      this.users.filter(user => (user.forname + " " + user.surname).toLowerCase().indexOf(search) > -1)
    );
  }

  changeClient(value: User) {
    this.chooseTeamLeader.emit(value.forname + " " + value.surname)
    console.log("Here")
  }
}

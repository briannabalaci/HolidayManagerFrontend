import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

import { UpdateUser, User } from 'src/app/shared/data-type/User';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit,OnChanges {
  @Output()
  public createSignal = new EventEmitter<void>();
  @Input() editUserDto!: any;
  @Input() parent: any;
  
  displayUpdate=false;

  constructor(private adminService: AdminService) {
    
   }

  ngOnInit(): void {
    if (this.editUserDto == null) {
      this.displayUpdate = false;

    }
    else {this.displayUpdate = true; }
  }
  ngOnChanges() {
    console.log("ngOnChanges");
    if (this.editUserDto == null) {
      this.displayUpdate = false;

    }
    else {this.displayUpdate = true; }
      } 
  createUser(): void{
    

    this.createSignal.emit();
  }
  updateUser(updUser: UpdateUser): void{
    console.log(updUser);
    this.createSignal.emit()
   

  }
  cancelUpdate() {
    console.log("create-user cancelUpdate");
    this.editUserDto = null;
    this.parent.showUserForm = false;
    this.displayUpdate = false;
    this.createSignal.emit();
  }
}

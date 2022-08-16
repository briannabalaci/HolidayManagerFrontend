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
  @Input() editUserDto!: User;
  
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
    if (this.editUserDto == null) {
      this.displayUpdate = false;

    }
    else {this.displayUpdate = true; }
      } 
  createUser(newUser: User): void{
    
    console.log(newUser);
    this.createSignal.emit();
  }
  updateUser(updUser: UpdateUser): void{
    console.log(updUser);
    this.adminService.updateUser(updUser).subscribe(result =>console.log(typeof result));
    
  }
  cancelUpdate() {
    this.displayUpdate = false;
  }
}

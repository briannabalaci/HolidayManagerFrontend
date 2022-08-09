import { Component, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

import { User } from 'src/app/shared/data-type/User';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @Output()
  public createSignal = new EventEmitter<void>();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
 
  }
  createUser(newUser: User): void{
    console.log(newUser);
    this.adminService.createUser(newUser).subscribe(result=>this.createSignal.emit());
  }

}

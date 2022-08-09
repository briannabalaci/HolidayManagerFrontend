import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

import { User } from 'src/app/shared/data-type/User';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
 
  }
  createUser(newUser: User): void{
    console.log(newUser);
    this.adminService.createUser(newUser).subscribe(result=>console.log(result));
  }

}

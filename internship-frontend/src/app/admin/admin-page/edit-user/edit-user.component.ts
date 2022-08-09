import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AdminService } from 'src/app/service/admin.service';
import { UpdateUser, User } from 'src/app/shared/data-type/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  template:`{{param}}`,
})

export class EditUserComponent implements OnInit {
  userString: string;
  sub: any;
  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute,) {
    this.userString = "";
    this.sub =this.route
    .paramMap
    .subscribe(params => {
      console.log(params.get('param'));
      this.userString += params.get('param')||"";
    });
    console.log(this.userString);

    }

   
   

  ngOnInit(): void {
    
  }
  updateUser(updUser: UpdateUser): void{
    console.log(updUser);
   this.adminService.updateUser(updUser).subscribe(result=>console.log(result));
  }

}

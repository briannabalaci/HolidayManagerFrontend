import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AdminService } from 'src/app/service/admin.service';
import { User } from 'src/app/shared/data-type/User';
import { __param } from 'tslib';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users?: User[];
  dataSource: any;
  constructor(private adminService:AdminService,private router: Router){}
  displayedColumns: string[] = ['email', 'department',"edituser"];
 
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  
  ngOnInit() {
 
    this.adminService.getAllUsers().subscribe(data => {
    
      this.users = data;
       this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    
    });
    
  }
  getRecord(user:User)
  {
    let param = "";
     param = JSON.stringify(user);
    console.log(param.toString());
    this.router.navigate(['/update-user', param ]);
    //EDIT USER
  }
}



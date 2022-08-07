import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin.service';
import { User } from 'src/app/shared/data-type/User';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users?: User[];
  dataSource: any;
  constructor(private adminService:AdminService){}
  displayedColumns: string[] = ['email', 'department',"edituser"];
 
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  ngOnInit() {
 
    this.adminService.getAllUsers().subscribe(data => {
    
      this.users = data;
       this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    console.log(this.users);
    });
    
  }
  getRecord(user:User)
  {
    alert(user);
    //EDIT USER
  }
}



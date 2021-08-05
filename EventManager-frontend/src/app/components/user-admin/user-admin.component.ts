import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/data-types/user';
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  public displayedColumns = ["forename", "surname", "email", "role", "department", "info", "edit", "delete"];
  public dataSource:User[] = [];
  public dataSourceUpdated:MatTableDataSource<User> = new MatTableDataSource<User>();
  public showForm:boolean = true;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      data => {
        this.dataSource = data;
        this.dataSourceUpdated.data = this.dataSource;
      }
      
    )
  }

  collectData(user: User):void {

    this.service.postUser(user).subscribe(() => {
      this.dataSource.push(user);
      this.dataSourceUpdated.data = this.dataSource;
    })
  }



}

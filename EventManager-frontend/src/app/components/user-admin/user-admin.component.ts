import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/data-types/user';
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from 'src/app/shared/services/user.service';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  public displayedColumns = ["forename", "surname", "actions"];
  public dataSource:User[] = [];
  public dataSourceUpdated:MatTableDataSource<User> = new MatTableDataSource<User>();
  public showForm:boolean = true;

  constructor(private service: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      data => {
        this.dataSource = data;
        this.dataSourceUpdated.data = this.dataSource;
      },
      err => {console.log(err);}
      
    )
  }

  collectData(user: User):void {

    this.service.createUser(user).subscribe(() => {
      this.dataSource.push(user);
      this.dataSourceUpdated.data = this.dataSource;
      window.location.reload();
    })
  }

  openInfo(user: User): void {
    this.dialog.open(MessageComponent, {
      data:{ parameter: user,
      component: 'admin'
        }
      }
    )
  }

}

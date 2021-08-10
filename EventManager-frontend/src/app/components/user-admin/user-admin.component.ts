import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/data-types/user';
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from 'src/app/shared/services/user.service';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { ChildActivationEnd } from '@angular/router';

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
  public createForm = true;
  public userToEdit?: User;

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
    if(this.createForm === true) {
      this.createUser(user);
    }
    else {
      this.updateUser(user);
    }
  }

  updateUser(user: User) {
    this.service.updateUser(user).subscribe(() => {
      let index = this.dataSource.length;
      for(let i = 0; i < this.dataSource.length; i ++) {
        if(this.dataSource[i].id === user.id) {
          index = i;
        }
      }
      this.dataSource[index] = user;
      this.dataSourceUpdated.data = this.dataSource;
    })
    this.createForm = false;
  }

  createUser(user: User) {
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

  delete(user: User): void {
    this.service.deleteUser(user.id!).subscribe(
      data => {
        const index = this.dataSource.indexOf(user);
        this.dataSource.splice(index, 1);
        this.dataSourceUpdated.data = this.dataSource;
      },
      err => {
        console.log('Cannot delete user - not found');
      }
    );
  }

  edit(user: User): void {
    this.userToEdit = user;
    this.createForm = false;
  }

  toggleCreateForm(): void {
    this.createForm = !this.createForm;
  }
}

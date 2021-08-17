import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/data-types/user';
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from 'src/app/shared/services/user.service';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { ChildActivationEnd } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatSort, {static:true})sort!: MatSort;

  constructor(private service: UserService, private dialog: MatDialog) { }


  ngOnInit(): void {

    this.dataSourceUpdated.filterPredicate = (data: User, filterValue: string) =>
      (data.forename!+" "+data.surname!).toLowerCase().indexOf(filterValue) !== -1;
    
    this.service.getUsers().subscribe(
      data => {
        this.dataSource = data;
        this.dataSourceUpdated.data = this.dataSource;
      },
      err => {console.log(err);}
      
    )
    this.dataSourceUpdated.sort = this.sort;
  }

  collectData(user: User):void {
    user.password = btoa(user.password || '');
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
      this.dataSource.push(user);
      this.dataSourceUpdated.data = this.dataSource;
      window.location.reload();
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

    const dialogRef = this.dialog.open(MessageComponent, {
      data: {component: 'confirmDelete'}
    })

    dialogRef.afterClosed().subscribe(data => {
      if(data === true)
      {
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
    })
  }

  edit(user: User): void {
    this.userToEdit = user;
    this.createForm = false;
  }

  toggleCreateForm(): void {
    this.createForm = !this.createForm;

  }

  

  searchUser(event: any) {
    this.dataSourceUpdated.filter = event.target.value.trim().toLowerCase();
  }
}

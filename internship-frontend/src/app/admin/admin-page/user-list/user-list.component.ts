import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild,Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AdminService } from 'src/app/service/admin.service';
import { UpdateUser, User, UserType } from 'src/app/shared/data-type/User';
import { __param } from 'tslib';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogBoxComponent } from 'src/app/confirmation-dialog-box/confirmation-dialog-box.component';
import { FormControl } from '@angular/forms';
import {MatSort, Sort} from '@angular/material/sort';
import { MessageDialogBoxComponent } from 'src/app/message-dialog-box/message-dialog-box.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,OnChanges {
  @Input() someInput?: string;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() updateUserSignal = new EventEmitter<User>();
  @Input() parent: any;
  users?: User[];
  dataSource = new MatTableDataSource<User>();
  constructor(private adminService: AdminService, private router: Router, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
   
  }
  fornameFilter = new FormControl('');
  surnameFilter = new FormControl('');

  filteredValues = {
    forname: '', surname: ''
  };
  displayedColumns: string[] = ['surname','forname','department',"edituser","deleteuser"];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  createFilter(): (data: User, filter: string) => boolean {
    return function (data, filter): boolean {
      let searchUser = JSON.parse(filter);
      return (data.surname+"").toLowerCase().indexOf(searchUser.surname.toLowerCase()) !== -1
        && data.forname!.toString().toLowerCase().indexOf(searchUser.forname.toLowerCase()) !== -1
    };
  }
  ngOnInit() {
    
    this.adminService.getAllUsers().subscribe(data => {
    
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
    this.fornameFilter.valueChanges.subscribe(
      fornameFilterValue => {
        // @ts-ignore
        this.filteredValues.forname= fornameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );

    this.surnameFilter.valueChanges.subscribe(
      surnameFilterValue => {
        // @ts-ignore
        this.filteredValues.surname = surnameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );
}
 
  ngOnChanges() {

    this.populateUserList() 
    
  }
  populateUserList() {
    this.adminService.getAllUsers().subscribe(data => {

      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = this.createFilter();

      this.dataSource.paginator = this.paginator;

    })
  }
  getRecord(user:User)
  {
    this.updateUserSignal.emit(user);
   console.log("user-list.component")
    //EDIT USER
  }
  getRecordDelete(user: User) {
    if (user.type === UserType.TEAMLEAD) {
      const dialogRef = this.dialog.open(MessageDialogBoxComponent, {
        width: '300px',
        data: "This user is a teamlead",
  
      });
    }
    else {
      const dialogRef = this.dialog.open(ConfirmationDialogBoxComponent, {
        width: '300px',
        data: "Are you sure you want to delete user " + user.forname + " " + user.surname + "?"
      });

      dialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.adminService.deleteUser(user.email || "").subscribe(result => { this.populateUserList() });
      
        
        }
      })
    }
    };
  }


import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild,Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AdminService } from 'src/app/service/admin.service';
import { UpdateUser, User } from 'src/app/shared/data-type/User';
import { __param } from 'tslib';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogBoxComponent } from 'src/app/confirmation-dialog-box/confirmation-dialog-box.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,OnChanges {
  @Input() someInput?: string;

  @Output() updateUserSignal = new EventEmitter<User>();
  users?: User[];
  dataSource = new MatTableDataSource<User>();
  constructor(private adminService: AdminService, private router: Router, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
   
  }
  displayedColumns: string[] = ['surname','forname','department',"edituser","deleteuser"];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  
  ngOnInit() {
    
    this.adminService.getAllUsers().subscribe(data => {
    
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
}
  private ReloadData():void {
    console.log("RELOAD");
    this.adminService.getAllUsers().subscribe(data => {
      console.log("RELOAD USERS");
      this.dataSource.data = data;
   
  })}
  ngOnChanges() {

    this.ReloadData();
    
  }
  
  getRecord(user:User)
  {
    this.updateUserSignal.emit(user);
   console.log("user-list.component")
    //EDIT USER
  }
  getRecordDelete(user: User) {
  
    const dialogRef = this.dialog.open(ConfirmationDialogBoxComponent, {
      width: '300px',
      data: "Are you sure you want to delete user "+user.forname+" "+user.surname+"?",
    });
    dialogRef.afterClosed().subscribe( response => {
      if (response) {
        this.adminService.deleteUser(user.email || "").subscribe(result => {this.ReloadData();});
      
        
      }
    })





    };
  }


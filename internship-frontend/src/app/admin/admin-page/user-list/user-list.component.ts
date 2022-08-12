import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AdminService } from 'src/app/service/admin.service';
import { UpdateUser, User } from 'src/app/shared/data-type/User';
import { __param } from 'tslib';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,OnChanges {
  @Input() someInput?: string;

  @Output() updateUserSignal = new EventEmitter<User>();
  users?: User[];
  dataSource: any;
  constructor(private adminService:AdminService,private router: Router,public dialog: MatDialog){}
  displayedColumns: string[] = ['email', 'department',"edituser","deleteuser"];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  
  ngOnInit() {
 
    this.adminService.getAllUsers().subscribe(data => {
    
      this.users = data;
       this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    
    });
    
  }
  ngOnChanges() {
    console.log("RELOAD");
    this.adminService.getAllUsers().subscribe(data => {
    
      this.users = data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    });  } 
  getRecord(user:User)
  {
    this.updateUserSignal.emit(user);
   console.log("user-list.component")
    //EDIT USER
  }
  getRecordDelete(user: User) {
  
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: user,
    });
  

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.adminService.getAllUsers().subscribe(data => {
    
        this.users = data;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
      });
    }); 


    };
  }






@Component({
  selector: 'delete-user-dialog',
  templateUrl: './delete-user-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}
  ngOnInit(): void {};
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.adminService.deleteUser(this.data.email || "").subscribe(result=>{});
    this.dialogRef.close();
  }

}
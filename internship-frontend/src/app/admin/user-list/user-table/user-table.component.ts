import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/data-type/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['Forname', 'Surname', 'Email', 'Department', "Role","Type","Nr. Holidays"];
  dataSource = new MatTableDataSource<User>(this.USER_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  getRecord(name)
  {
    alert(name);
  }
  const USER_DATA:User[] = [
  {email:"test",
    password:'test',
    forname:'test',
    surname:'test',
    department:'test',
    role:'test',
 
    type: 'test'
},
{
  email: "test",
    password:'test',
    forname:'test',
    surname:'test',
    department:'test',
    role:'test',
 
    type:'test'}


  ];

  

}

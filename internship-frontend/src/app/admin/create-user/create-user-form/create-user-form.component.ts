import { Component, OnInit } from '@angular/core';
interface Department {
  value: string;
  viewValue: string;
}
interface Role {
  value: string;
  viewValue: string;
}

interface UserType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
  
export class CreateUserFormComponent implements OnInit {

  hide = true;
  hide_confirm = true;
  departments: Department[] = [
    {value: 'JAVA', viewValue: 'Java'},
    {value: 'ABAP', viewValue: 'ABAP'},
    {value: 'BUSINESS_INTELLIGENCE', viewValue: 'Business_Intelligence'},
  ];
  roles: Role[] = [
    {value: 'TESTER', viewValue: 'Tester'},
    {value: 'DEVELOPER', viewValue: 'Developer'},
  
  ];
  userTypes: UserType[] = [
    {value: 'ADMIN', viewValue: 'Java'},
    {value: 'TEAMLEAD', viewValue: 'ABAP'},
    {value: 'EMPLOYEE', viewValue: 'Employee'},
  ];
  constructor() { 
 
  }

  ngOnInit(): void {
  }

}

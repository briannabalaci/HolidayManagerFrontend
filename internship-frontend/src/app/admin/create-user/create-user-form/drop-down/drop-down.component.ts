import { Component} from '@angular/core';
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
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent{
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


}

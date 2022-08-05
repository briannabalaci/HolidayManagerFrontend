import { Component,EventEmitter, OnInit,Output, } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { User } from 'src/app/shared/data-type/User';

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
  @Output() clickCreate =new EventEmitter<User>();
  hide = true;
  hide_confirm = true;
  type_d = "";
  role_d = "";
  department_d = "";



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



  changeDepartment(value: string) {
    this.department_d = value;
}
changeRole(value: string) {
  this.role_d = value;
}
changeType(value: string) {
  this.type_d = value;
}
  createUserForm = this.formBuilder.group({
    
    email:['',Validators.required],
    password: ['', Validators.required],
    verifPassword:['',Validators.required],
    forName:['',Validators.required],
    surName:['',Validators.required],
    
    nrHolidays:['',Validators.required],
   
    
  })
  constructor(private formBuilder:FormBuilder) { 
 
  }

  ngOnInit(): void {
  }
  createUser(): void{
    const valuesFromForm = this.createUserForm.value;
    const newUser = {
      email:valuesFromForm.email,
    password:valuesFromForm.password,
    forname:valuesFromForm.forName,
    surname:valuesFromForm.surName,
    department: this.department_d,
    role:this.role_d,
    nrHolidays:valuesFromForm.nrHolidays,
    type:this.type_d,

    }
   
    console.log("ok",newUser);
     //@ts-ignore
    this.clickCreate.emit(newUser);
  }
}

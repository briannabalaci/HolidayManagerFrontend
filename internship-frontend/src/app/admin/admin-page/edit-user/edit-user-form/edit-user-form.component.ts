import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Team } from 'src/app/shared/data-type/Team';
import { Department, Role, UpdateUser, User, UserType } from 'src/app/shared/data-type/User';

interface DepartmentInt {
  value: string;
  viewValue: string;
}
interface RoleInt {
  value: string;
  viewValue: string;
}

interface JsonDtoInt {
  id:number;
  email:string;
  password:string;
  forname:string;
  surname:string;
  department:string;
  role:string;
  nrHolidays:number;
  type:string;
  team:string;
}

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],

})



  
export class EditUserFormComponent implements OnInit {
  @Output() clickUpdate = new EventEmitter<UpdateUser>();
  @Input()
  userDto!: string;
  
  hide = true;
  hide_confirm = true;
  
  role_d="";
  department_d = "";
  forname_d="";
  surname_d= "";
  nrHolidays_d = 0;
  email_d = "";
  password_d=""


  departments: DepartmentInt[] = [
    { value: 'JAVA', viewValue: 'Java' },
    { value: 'ABAP', viewValue: 'ABAP' },
    { value: 'BUSINESS_INTELLIGENCE', viewValue: 'Business_Intelligence' },
  ];
  roles: RoleInt[] = [
    { value: 'TESTER', viewValue: 'Tester' },
    { value: 'DEVELOPER', viewValue: 'Developer' },
  
  ];



  changeDepartment(value: string) {
    this.department_d = value;
  }
  changeRole(value: string) {
    this.role_d = value;
  }

  createUserForm = this.formBuilder.group({
    
    email: ['', Validators.required],
    password: ['', Validators.required],
    forName: ['', Validators.required],
    surName: ['', Validators.required],
    nrHolidays: ['', Validators.required],
   
    
  })
  constructor(private formBuilder: FormBuilder) {
   ;  
  }

  ngOnInit(): void {
    console.log(this.userDto);
    let userJson = JSON.parse(this.userDto);

   
    this.role_d = userJson.role;
    this.department_d = userJson.department;
   
    this.forname_d = userJson.forname;
    this.surname_d = userJson.surname;
    this.nrHolidays_d = parseInt(userJson.nrHolidays);
    this.email_d = userJson.email;
    this.password_d = userJson.password;
    console.log(this.nrHolidays_d);
  }
updateUser(): void {
    const valuesFromForm = this.createUserForm.value;
    const updUser = {
      email: valuesFromForm.email,
      password: valuesFromForm.password,
      forname: valuesFromForm.forName,
      surname: valuesFromForm.surName,
      department: this.department_d,
      role: this.role_d,
      nrHolidays: valuesFromForm.nrHolidays,
     

    }
   
    console.log("ok", updUser);
    //@ts-ignore
    this.clickUpdate.emit(updUser);
  }
}
import { Component,EventEmitter, OnInit,Output, } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { catchError, map } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { User } from 'src/app/shared/data-type/User';

interface DepartmentInt {
  value: string;
  viewValue: string;
}
interface RoleInt {
  value: string;
  viewValue: string;
}

interface UserTypeInt {
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
  showEmailErrorMessage = false;
  showEmailOkMessage = false;
  departments: DepartmentInt[] = [
    {value: 'JAVA', viewValue: 'Java'},
    {value: 'ABAP', viewValue: 'ABAP'},
    {value: 'BUSINESS_INTELLIGENCE', viewValue: 'Business_Intelligence'},
  ];
  roles: RoleInt[] = [
    {value: 'TESTER', viewValue: 'Tester'},
    {value: 'DEVELOPER', viewValue: 'Developer'},
  
  ];
  userTypes: UserTypeInt[] = [
    {value: 'ADMIN', viewValue: 'Admin'},
    {value: 'TEAMLEAD', viewValue: 'Teamlead'},
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
    
    password: ['', Validators.required],
    email: ['', Validators.required],
    forName: ['', Validators.required],
    surName: ['', Validators.required],
    nrHolidays: ['', Validators.required],
   
    
  });
  constructor(private formBuilder:FormBuilder,private adminService: AdminService) { 
 
  }

  ngOnInit(): void {
  }
  createUser(): void{
    const valuesFromForm = this.createUserForm.value;
   
    const newUser = {
      
    password:valuesFromForm.password,
    forname: valuesFromForm.forName,
    email: valuesFromForm.email,
    surname:valuesFromForm.surName,
    department: this.department_d,
    role:this.role_d,
    nrHolidays:valuesFromForm.nrHolidays,
    type:this.type_d,

    }
   
    console.log("ok",newUser);
     //@ts-ignore
    
   
let u:User= Object.assign({}, newUser);
    this.sendAddUserRequest(u);
    
    this.createUserForm.reset();
    
  }
  resetWarnings() {
    this.showEmailErrorMessage = false;
    this.showEmailOkMessage=false
  }
  sendAddUserRequest(userDto: User) {

    this.adminService.createUser(userDto).subscribe(results => {
      console.log(JSON.stringify(results));
      if (JSON.stringify(results) === "User created succesfully!") { this.showEmailOkMessage = true; }
      if(JSON.stringify(results)==="The user already exists!"){ this.showEmailErrorMessage = true; }  });
  }
      /*subscribe(result => {
      console.log(result);
      if (result == "The user already exists!") {
        this.showEmailErrorMessage = true;
    } });*/
  /*    map((res: any) => {
        const events = res.eventList;
        return events.map(e => new EventLogModel(e));
      }),
      catchError(this.handleError);
    )*/
     
  }


import { Component,EventEmitter, Input, OnInit,Output, } from '@angular/core';
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
  @Output() clickCreate = new EventEmitter<User>();
  @Input() parent: any;
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
    email: ['', Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
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
    type:"EMPLOYEE",

    }
   
    console.log("ok",newUser);
     //@ts-ignore
    
   
    let u: User = Object.assign({}, newUser);
    if (!this.createUserForm.invalid) {
      this.sendAddUserRequest(u);
    
      this.createUserForm.reset();
    }
    else { console.log("DATE INVALIDE"); }
  }
  resetWarnings() {
    this.showEmailErrorMessage = false;
    this.showEmailOkMessage=false
  }
  sendAddUserRequest(userDto: User) {

    this.adminService.createUser(userDto).subscribe(results => {
      let resp = JSON.stringify(results);
      console.log(resp);
      if (resp == '"User created succesfully!"') { this.showEmailOkMessage = true; console.log("aici"); }
      if (resp == '"The user already exists!"') { this.showEmailErrorMessage = true; }
      this.clickCreate.emit()
    });
    
  }

     
  }


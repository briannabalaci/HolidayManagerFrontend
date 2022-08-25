import { Component,EventEmitter, Input, OnInit,Output, } from '@angular/core';
import { FormBuilder,FormGroupDirective,Validators } from '@angular/forms';
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
  showFieldErrorMessage = false;

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
    
    password: [null, Validators.required],
    email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
    forName: [null, Validators.required],
    surName: [null, Validators.required],
    nrHolidays: [null, Validators.required],
   
    
  });
  constructor(private formBuilder:FormBuilder,private adminService: AdminService) { 
 
  }

  ngOnInit(): void {
  }
  createUser(formDirective: FormGroupDirective): void{
    this.resetWarnings();
    const valuesFromForm = this.createUserForm.value;
  
  
    if (!this.createUserForm.invalid) {
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
         //@ts-ignore
        
       
        let u: User = Object.assign({}, newUser);

      this.sendAddUserRequest(u,formDirective);
    
      this.createUserForm.controls["email"].clearValidators();
      this.createUserForm.controls["email"].updateValueAndValidity();
      this.createUserForm.controls["email"].addValidators([Validators.required]);
      this.createUserForm.controls["email"].addValidators(Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"));
      this.createUserForm.controls["email"].updateValueAndValidity();

    
     


      
    }
    else {
      this.showFieldErrorMessage = true; 

      this.createUserForm.controls["email"].clearValidators();
      this.createUserForm.controls["email"].updateValueAndValidity();
      this.createUserForm.controls["email"].addValidators([Validators.required]);
      this.createUserForm.controls["email"].addValidators(Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"));
      this.createUserForm.controls["email"].updateValueAndValidity();
    
     


      
    
   
    }
  }
  resetWarnings() {
    this.showEmailErrorMessage = false;
    this.showEmailOkMessage = false;
    this.showFieldErrorMessage = false;
  }
  sendAddUserRequest(userDto: User,formDirective: FormGroupDirective) {

    this.adminService.createUser(userDto).subscribe(results => {
      let resp = JSON.stringify(results);
      console.log(resp);
      this.resetWarnings();
      if (resp == '"User created succesfully!"') {
        this.showEmailOkMessage = true;
        this.createUserForm.reset();
        formDirective.resetForm();
      }
      else {
        if (resp == '"The user already exists!"') { this.showEmailErrorMessage = true; }
        else { this.showFieldErrorMessage = true; }
      }
      this.clickCreate.emit()
    });
    
  }

     
  }


import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { Team } from 'src/app/shared/data-type/Team';
import { Department, Role, UpdateUser, User, UserType } from 'src/app/shared/data-type/User';
import { AdminPageComponent } from '../../admin-page.component';

interface DepartmentInt {
  value: string;
  viewValue: string;
}
interface RoleInt {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],

})



  
export class EditUserFormComponent implements OnInit , OnChanges{
  @Output() clickUpdate = new EventEmitter<UpdateUser>();
  @Output() cancelUpdate = new EventEmitter<void>();
  @Input() parent: any;

  @Input()
  userDto!: User;
  boolEditPassword= false;
  hide = true;
  hide_confirm = true;

  showEditErrorMessage = false;
  showEditOkMessage = false;
  role_d="";
  department_d = "";
  forname_d="";
  surname_d= "";
  nrHolidays_d = 0;
  email_d = "";
  password_d="";
  


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
    

    password: [''],
    forName: ['',Validators.required],
    surName: ['',Validators.required],
    nrHolidays: ['',Validators.required],
    boolEditPassword:['']
    
  })
  constructor(private formBuilder: FormBuilder,private adminService: AdminService) {
   ;  
  }

  ngOnInit(): void {
    console.log(this.userDto);
   

   
    this.role_d = this.userDto.role||"";
    this.department_d = this.userDto.department||"";
   
    this.forname_d = this.userDto.forname||"";
    this.surname_d = this.userDto.surname||"";
    this.nrHolidays_d = this.userDto.nrHolidays||0;
    this.email_d = this.userDto.email||"";
    
    console.log(this.nrHolidays_d);
  }


  ngOnChanges() {
    console.log(this.userDto);
   

   
    this.role_d = this.userDto.role||"";
    this.department_d = this.userDto.department||"";
   
    this.forname_d = this.userDto.forname||"";
    this.surname_d = this.userDto.surname||"";
    this.nrHolidays_d = this.userDto.nrHolidays || 0;
    this.email_d = this.userDto.email||"";
    
    console.log(this.nrHolidays_d);
  }
  updtUser(updUser: UpdateUser): void{
    this.adminService.updateUser(updUser).subscribe(result => {

      this.clickUpdate.emit(updUser);
      this.cancelUpdate.emit();
    
    });
    this.showEditErrorMessage = false;
    this.showEditOkMessage = true;
  }
  updateUser(): void {
    const valuesFromForm = this.createUserForm.value;
    const updUser = {
      email: this.email_d,
      password: valuesFromForm.password,
      forname: valuesFromForm.forName,
      surname: valuesFromForm.surName,
      department: this.department_d,
      role: this.role_d,
      nrHolidays: valuesFromForm.nrHolidays,
     

    }
    if (this.boolEditPassword) {
      this.createUserForm.controls["password"].addValidators([Validators.required]);
      this.createUserForm.controls["password"].updateValueAndValidity();
      updUser.password = valuesFromForm.password;
    }
    else {
      updUser.password = null;
      this.createUserForm.controls["password"].clearValidators();
      this.createUserForm.controls["password"].updateValueAndValidity();}
    console.log("ok", updUser);
   
    if (!this.createUserForm.invalid) {
      //@ts-ignore
      
      this.updtUser(updUser);
      
      
    }
    else {
      this.showEditErrorMessage = true;
      this.showEditOkMessage = false;
    }
  }

  resetWarnings() {
    this.showEditErrorMessage = false;
    this.showEditOkMessage=false
  }
}
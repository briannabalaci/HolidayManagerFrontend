import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/shared/data-types/user';
import { EventEmitter } from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../message/message.component';
import { RoleService } from 'src/app/shared/services/role.service';
import { Role } from 'src/app/shared/data-types/role';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/shared/services/department.service';


@Component({
  selector: 'app-user-admin-form',
  templateUrl: './user-admin-form.component.html',
  styleUrls: ['./user-admin-form.component.scss']
})
export class UserAdminFormComponent implements OnInit {

  public dataSource:Role[] = [];
  public dataSourceUpdated:MatTableDataSource<Role> = new MatTableDataSource<Role>();

  selectedRole: string = '';
  roles: string[] = [];

  selectedDepartment: string = '';
  departments: string[] = [];

  component: string = '';

  @Output() userEmitter = new EventEmitter<User>();
  @Output() createFormChangeEmitter = new EventEmitter();
  @Input() createForm?: boolean;
  @Input() userToEdit?: User;

  userFormGroup = this.formBuilder.group({
    forename: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    password: [''],
    role: ['', Validators.required],
    department: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private service: UserService,
              private dialog: MatDialog,
              private roleService: RoleService,
              private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(
      data => {
        for (var object of data) {
          this.roles.push(object.name!);
        }
      }
    )

    this.departmentService.getDepartments().subscribe(
      data => {
        for (var object of data) {
          this.departments.push(object.name!);
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.createForm === false) {
      this.updateFormValues();
    }
  }

  updateFormValues() {
    let userForm = this.userFormGroup.value;
    this.userFormGroup.setValue({
      forename: this.userToEdit?.forename,
      surname: this.userToEdit?.surname,
      email: this.userToEdit?.email,
      password: '',
      role: this.userToEdit?.role,
      department: this.userToEdit?.department
    })
  }

  onSubmit(userForm: any) {
    if(this.createForm === true) {
      this.createUser(userForm);
    }
    else {
      this.updateUser(userForm);
    }
  }

  createUser(userForm: any) {
    const user = this.userFormGroup.value;
    
    const usr: User = {
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
      department: user.department
    }

    if (!this.userFormGroup.valid) {
      this.component = 'incomplete';
    } else {
      this.component = 'email';
    }

    this.service.createUser(usr).subscribe(data => 
      {
        
      }, 
      err => 
      {
        this.dialog.open(MessageComponent, {
          data: { message: err.error,
            component: this.component
          }
        }),
        this.userFormGroup.reset();
        Object.keys(this.userFormGroup.controls).forEach(key => 
          this.userFormGroup.controls[key].setErrors(null));
      })

    this.userEmitter.emit(usr);
    userForm.resetForm();
  }

  updateUser(userForm: any) {
    const user = this.userFormGroup.value;
    
    const usr: User = {
      id: this.userToEdit?.id,
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
      department: user.department
    }
    this.userEmitter.emit(usr);
    this.createFormChangeEmitter.emit();
    userForm.resetForm();
  }

  onCancelUpdate(userForm: any): void {
    this.createFormChangeEmitter.emit();
    userForm.resetForm();
  }

}

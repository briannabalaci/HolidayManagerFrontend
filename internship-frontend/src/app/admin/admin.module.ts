import { CUSTOM_ELEMENTS_SCHEMA, NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CreateUserComponent } from './admin-page/create-user/create-user.component';
import { UserListComponent } from './admin-page/user-list/user-list.component';
import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'admin', component: AdminPageComponent
 }
]

@NgModule({
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ], 
  declarations: [
    AdminPageComponent,
    CreateUserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    CreateUserComponent
    
  ]
})
export class AdminModule { }

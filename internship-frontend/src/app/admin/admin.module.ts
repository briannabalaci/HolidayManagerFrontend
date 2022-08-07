import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { CreateUserFormComponent } from "./admin-page/create-user/create-user-form/create-user-form.component";
import { CreateUserComponent } from "./admin-page/create-user/create-user.component";
import { UserListComponent } from "./admin-page/user-list/user-list.component";



const routes: Routes = [
  {
    path: 'admin', component: AdminPageComponent
 }
]

@NgModule({

  declarations: [
  
  
  ],
  imports: [
    CreateUserComponent,
    UserListComponent,
    CreateUserFormComponent
  ]
})
export class AdminModule { }

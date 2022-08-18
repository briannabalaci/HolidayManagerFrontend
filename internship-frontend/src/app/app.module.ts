import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeedashComponent } from './employee/employeedash/employeedash.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { LoginFormComponent } from './landing/login-panel/login-form/login-form.component';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { LoginPanelModule } from './landing/login-panel/login-panel.module';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamsTableComponent } from './team-management/teams-table/teams-table.component';
import { CreateTeamComponent } from './team-management/create-team/create-team.component';
import {MatListModule} from "@angular/material/list";
import { TeamleadHomeComponent } from './home/teamlead-home/teamlead-home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoginResetFormComponent } from './landing/login-panel/login-reset-form/login-reset-form.component';
import {MatCardModule} from '@angular/material/card';
import { AuthentificationInterceptor } from './service/authentification.interceptor';
import { CreateUserFormComponent } from './admin/admin-page/create-user/create-user-form/create-user-form.component';
import { CreateUserComponent } from './admin/admin-page/create-user/create-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {UserListComponent } from './admin/admin-page/user-list/user-list.component';
import { AdminComponent } from './admin/admin.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { AdminModule } from './admin/admin.module';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavBarComponent } from './landing/nav-bar/nav-bar.component';
import { EditUserFormComponent } from './admin/admin-page/create-user/edit-user-form/edit-user-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { CreateRequestComponent } from './shared/create-request/create-request.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {TeamleadPickerComponent} from "./team-management/create-team/teamlead-picker/teamlead-picker.component";
import {ConfirmationDialogBoxComponent} from "./confirmation-dialog-box/confirmation-dialog-box.component";
import {TeamleadRequestsComponent} from "./home/teamlead-home/teamlead-requests/teamlead-requests.component";
import {TeamsRequestsComponent} from "./home/teamlead-home/teams-requests/teams-requests.component";
import {
  DetailedRequestComponent
} from "./home/teamlead-home/teams-requests/detailed-request/detailed-request.component";
import { RequestsTableComponent } from './shared/requests-table/requests-table.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NavBarNotificationsComponent } from './landing/nav-bar/nav-bar-notifications/nav-bar-notifications.component';
@NgModule({

  declarations: [
    TeamsRequestsComponent,
    DetailedRequestComponent,
    TeamleadRequestsComponent, /// astea 3
    AppComponent,
    EmployeedashComponent,
    LoginPanelComponent,
    LoginResetFormComponent,
    TeamManagementComponent,
    TeamsTableComponent,
    CreateTeamComponent,
    TeamleadHomeComponent,
    LoginFormComponent,
    AdminPageComponent,
    UserListComponent,
    EditUserFormComponent,
    CreateUserComponent,
    CreateUserFormComponent,
    AdminComponent,
    TeamleadPickerComponent,
    NavBarComponent,
    CreateRequestComponent,
    ConfirmationDialogBoxComponent,
    RequestsTableComponent, // asta difera
    NavBarNotificationsComponent
  ],
  imports: [
    MatNativeDateModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    AdminModule,
    MatPaginatorModule,
    LoginPanelModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSortModule,
    NgxMatSelectSearchModule,
    ScrollingModule,
    MatBadgeModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi: true}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { TeamleadRequestsComponent } from './teamlead-requests/teamlead-requests.component';
import {MatListModule} from "@angular/material/list";
import {Routes} from "@angular/router";
import {RegisterPanelComponent} from "../../landing/register-panel/register-panel.component";
import {TeamleadHomeComponent} from "./teamlead-home.component";
import { TeamsRequestsComponent } from './teams-requests/teams-requests.component';

const routes: Routes = [
  {
    path: 'teamlead', component: TeamleadHomeComponent
  }
]

@NgModule({
  declarations: [
    TeamleadRequestsComponent,
    TeamsRequestsComponent
  ],
  exports: [
    TeamleadRequestsComponent,
    TeamsRequestsComponent
  ],
  imports: [
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    CommonModule
  ]
})
export class TeamleadHomeModule { }

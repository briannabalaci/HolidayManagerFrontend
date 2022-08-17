import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {Routes} from "@angular/router";
import {TeamleadHomeComponent} from "./teamlead-home.component";
import {MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MoreDetailsDialogBoxComponent } from './teams-requests/more-details-dialog-box/more-details-dialog-box.component';
import {MatDialogModule} from "@angular/material/dialog";

const routes: Routes = [
  {
    path: 'teamlead', component: TeamleadHomeComponent,
  }
]

@NgModule({
  declarations: [
    // TeamleadRequestsComponent,
    // TeamsRequestsComponent,
    // DetailedRequestComponent

  ],
  exports: [
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
        CommonModule,
        MatSortModule,
        FormsModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatDialogModule
    ]
})
export class TeamleadHomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EventCardComponent } from './event-card/event-card.component';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    EventCardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatSelectModule
  ],
  exports: [
    DashboardComponent,
    EventCardComponent
  ]
})
export class DashboardModule { }

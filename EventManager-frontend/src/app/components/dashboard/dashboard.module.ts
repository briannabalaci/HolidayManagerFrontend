import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EventCardComponent } from './event-card/event-card.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationModule } from '../navigation/navigation.module';

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
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NavigationModule
  ],
  exports: [
    DashboardComponent,
    EventCardComponent
  ]
})
export class DashboardModule { }

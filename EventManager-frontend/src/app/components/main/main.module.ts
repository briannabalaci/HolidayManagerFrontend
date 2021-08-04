import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { EventCardComponent } from '../dashboard/event-card/event-card.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    EventCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    MainComponent,
    DashboardComponent,
    EventCardComponent
  ]
})
export class MainModule { }

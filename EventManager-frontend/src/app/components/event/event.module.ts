import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { RouterModule, Routes } from '@angular/router';
import { EventExtrasComponent } from './event-extras/event-extras.component';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field/'
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
const routes: Routes = [
  {
    path: '',
    component: EventComponent
  }
]

@NgModule({
  declarations: [EventComponent,
  EventExtrasComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
  ]
})
export class EventModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EventComponent } from './event.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { EventExtrasComponent } from './event-extras/event-extras.component';
import {MatListModule} from '@angular/material/list'; 
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [
  {
    path: '',
    component: EventComponent
  }
]

@NgModule({
  declarations: [
    EventComponent,
    EventExtrasComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFileUploadModule,
    NgxMatFileInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [  
    NgxMatDatetimePickerModule, 
    DatePipe
  ],
  exports: [EventComponent]
})
export class EventModule { }

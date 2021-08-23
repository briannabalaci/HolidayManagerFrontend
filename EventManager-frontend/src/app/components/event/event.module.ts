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
import { EventDetailsComponent } from './event-details/event-details.component';
import { RoleGuardService } from 'src/app/shared/services/role-guard.service';
import { DynamicFormComponent } from './event-details/dynamic-form/dynamic-form.component';
import { QuestionComponent } from './event-details/dynamic-form/question/question.component';
import { NavigationModule } from '../navigation/navigation.module';
import { EventStatisticsComponent } from './event-statistics/event-statistics.component';
import { MatTableModule } from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
  {
    path: ':eventId',
    component: EventDetailsComponent
  },
  {
    path: ':eventId/statistics',
    component: EventStatisticsComponent
  },
  {
    path: '', pathMatch: 'full',
    canActivate: [RoleGuardService], 
    data: {
      expectedRole: ['ORGANIZER']
    },
    component: EventComponent
  }
]

@NgModule({
  declarations: [
    EventComponent,
    EventExtrasComponent,
    EventDetailsComponent,
    DynamicFormComponent,
    QuestionComponent,
    EventStatisticsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
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
    MatCardModule,
    NavigationModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [  
    NgxMatDatetimePickerModule, 
    DatePipe
  ],
  exports: [EventComponent]
})
export class EventModule { }

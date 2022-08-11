import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
//import { EmployeedashComponent } from './employeedash.component';
import { Routes } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { EmployeedashComponent } from './employeedash.component';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
  {
    path: 'employee', component: EmployeedashComponent
 }
]
@NgModule({
  // add components related to this module in the declarations
  // otherwise, the module is redundant
  declarations: [EmployeedashComponent
  ],
  imports: [
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatInputModule
  ],
  exports:[
  ],
  providers: [],
})
export class LoginPanelModule { }

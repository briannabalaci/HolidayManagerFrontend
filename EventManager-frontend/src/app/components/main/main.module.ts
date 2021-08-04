import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './main.component';
import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
]

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }

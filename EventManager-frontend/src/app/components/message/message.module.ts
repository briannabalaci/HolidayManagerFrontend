import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageComponent } from './message.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations:[MessageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  exports: [
    MessageComponent,
  ]

})
export class MessageModule { }

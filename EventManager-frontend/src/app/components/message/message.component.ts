import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Answer } from 'src/app/shared/data-types/answer';
import { Question } from 'src/app/shared/data-types/question';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MessageComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder) { }

  form =  this.formBuilder.group({
    answer: ['', Validators.required],
  })

  login: boolean = false;
  admin: boolean = false;
  event_extras: boolean = false;
  input : boolean = false;
  email: boolean = false;
  incomplete: boolean = false;
  public question?: Question ;

  ngOnInit(): void {
    if (this.data.component === 'login') {
      this.login = true;
    }

    if (this.data.component === 'admin') {
      this.admin = true;
    }

    if (this.data.component === 'email') {
      this.email = true;
    }

    if (this.data.component === 'incomplete') {
      this.incomplete = true;
    }

    if (this.data.component === 'event-extras') {
      console.log("HELLO");
      this.event_extras = true;
      this.question = JSON.parse(sessionStorage.getItem('question') || '{}');
      this.question?.answerList?.push(new Answer('No'));
      
    }
  }

  showInput() : void {
      this.input = true;
  }
  onSubmit() : void {
      this.question?.answerList?.push(new Answer(this.form.value.answer));
      this.input = false;
  }
  close(): void {

    this.dialogRef.close();


  }



}

import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VirtualTimeScheduler } from 'rxjs';
import { Answer } from 'src/app/shared/data-types/answer';
import { Question } from 'src/app/shared/data-types/question';
import { MessageComponent } from '../../message/message.component';

@Component({
  selector: 'app-event-extras',
  templateUrl: './event-extras.component.html',
  styleUrls: ['./event-extras.component.scss']
})
export class EventExtrasComponent implements OnInit {

  

  form =  this.formBuilder.group({
    question: ['', Validators.required],
  })

  formAnswer =  this.formBuilder.group({
    answer: ['', Validators.required],
  })

  public questions: Question[] = [];
  input: boolean = false;
  inputAnswer: boolean = false
  add: boolean = true;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }
  ngOnInit(): void {
  
  }

  showInfo(question: Question): void {
      sessionStorage.setItem('question',JSON.stringify(question));
      this.dialog.open(MessageComponent, {
            data: {
              component : 'event-extras'
            }
      })
  }
  
  showInput() : void {
    this.input = true;
  }

  showInputAnswer() : void {
    this.inputAnswer = true;
  }

  onSubmit() : void {
    this.input = false;
    this.questions.push(new Question(this.form.value.question, new Array<Answer>()));
    sessionStorage.setItem('questions',JSON.stringify(this.questions));
    this.form.reset();
  }


  onSubmitAnswer(question: Question) : void {
      this.inputAnswer = false;
      question.answerList?.push(new Answer(this.formAnswer.value.answer));
      sessionStorage.setItem('questions',JSON.stringify(this.questions));
      this.formAnswer.reset();
  }



  


}

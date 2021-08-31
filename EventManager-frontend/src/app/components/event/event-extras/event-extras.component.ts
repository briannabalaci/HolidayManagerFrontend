// @ts-nocheck

import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VirtualTimeScheduler } from 'rxjs';
import { Answer } from 'src/app/shared/data-types/answer';
import { Question } from 'src/app/shared/data-types/question';
import { MessageComponent } from '../../message/message.component';
import { QuestionControlService } from '../../../shared/services/question-control.service';

@Component({
  selector: 'app-event-extras',
  templateUrl: './event-extras.component.html',
  styleUrls: ['./event-extras.component.scss']
})
export class EventExtrasComponent implements OnInit {



  form = this.formBuilder.group({
    question: ['', Validators.required],
  })

  formAnswer = this.formBuilder.group({
    answer: ['', Validators.required],
  })

  @Input() questions: Question[] = [];

  // @Output() newQuestion = new EventEmitter<boolean>();

  @Output() questionEmitter = new EventEmitter<Question>();

  @Output() questionsEmitter = new EventEmitter<Question[]>();



  input: boolean = false;
  inputAnswer: boolean = false;
  add: boolean = true;
  indexExpand : number = -1;
  canUpdateBasedOnQuestion : boolean = false;


  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,private questionControlService:QuestionControlService) { }
  ngOnInit(): void {


  }

  checkAnswers() {
    for(var i = 0; i < this.questions.length; i++)
    {
      console.log("Hi");
      if(this.questions[i].answerList?.length === 0)
      {
        document.getElementById('ErrorQuestion' + i)?.style.border = "solid 2px red";
      }
      else 
      {
        document.getElementById('ErrorQuestion' + i)?.style.border = "none";
      }

   }
  }


  showInput(): void {
    this.input = true;
  }

  showInputAnswer(): void {
    this.inputAnswer = true;
  }

  onSubmit(): void {
    this.input = false;
    let newQuestion = new Question(this.form.value.question, new Array<Answer>());
    this.indexExpand = this.questions.length;
    this.inputAnswer = true;
    this.canUpdateBasedOnQuestion = false;
    this.questionEmitter.emit(newQuestion);
   
    this.form.reset();
  }


  onSubmitAnswer(question: Question): void {
    this.inputAnswer = false;
    let newAnswer = new Answer(this.formAnswer.value.answer);
    question.answerList?.push(newAnswer);
    this.questionsEmitter.emit(this.questions);
    this.checkAnswers();
    this.formAnswer.reset();
  }

  deleteAnswer(index: number, question: Question, indexQ: number): void {
   
      question.answerList?.splice(index, 1);

      this.questions[indexQ] = question;

      this.questionsEmitter.emit(this.questions);

      this.checkAnswers();


  }

  edit(index: number, indexQuestion: number): void {

    this.questions[indexQuestion].answerList[index].text = document.getElementById("answer"+index+indexQuestion).value;

    this.questionsEmitter.emit(this.questions);


  }

 

  deleteQuestion(index: number,event: Event) {


    event.stopPropagation();

    this.questions.splice(index, 1);

    this.questionsEmitter.emit(this.questions);

    this.form.reset();
  }

  editQ(question: Question, index: number): void {

    this.questions[index].text = document.getElementById("questionText" + index).value;

    this.questionsEmitter.emit(this.questions);



  }





}

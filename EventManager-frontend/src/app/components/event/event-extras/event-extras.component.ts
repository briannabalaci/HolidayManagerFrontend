// @ts-nocheck

import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
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



  form = this.formBuilder.group({
    question: ['', Validators.required],
  })

  formAnswer = this.formBuilder.group({
    answer: ['', Validators.required],
  })

  @Input() questions: Question[] = [];
  input: boolean = false;
  inputAnswer: boolean = false;
  editAnswer: boolean = false;
  editQuestion: boolean = false;
  editableQuestion: Question;
  add: boolean = true;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }
  ngOnInit(): void {

    sessionStorage.setItem('questions', JSON.stringify(this.questions));

  }

  showInfo(question: Question): void {
    sessionStorage.setItem('question', JSON.stringify(question));
    this.dialog.open(MessageComponent, {
      data: {
        component: 'event-extras'
      }
    })
  }

  showInput(): void {
    this.input = true;
  }

  showInputAnswer(): void {
    this.inputAnswer = true;
  }

  onSubmit(): void {
    this.input = false;
    this.questions.push(new Question(this.form.value.question, new Array<Answer>()));
    sessionStorage.setItem('questions', JSON.stringify(this.questions));
    this.form.reset();
  }


  onSubmitAnswer(question: Question): void {
    this.inputAnswer = false;
    question.answerList?.push(new Answer(this.formAnswer.value.answer));
    sessionStorage.setItem('questions', JSON.stringify(this.questions));
    this.formAnswer.reset();
  }

  deleteAnswer(index: number, question: Question): void {
   


      question.answerList?.splice(index, 1);

  }

  edit(answer: Answer): void {


    this.editAnswer = true;

    this.formAnswer.setValue({
      answer: answer.text
    })

  }

  onEditAnswer(answer: Answer, question: Question, index: number): void {
    console.log(answer);
    question.answerList[index].text = this.formAnswer.value.answer;


    this.editAnswer = false;
  }

  deleteQuestion(index: number,event: Event) {


    event.stopPropagation();

    this.questions.splice(index, 1);

    this.editQuestion = false;

    this.editAnswer = false;

    this.form.reset();
  }

  editQ(question: Question, event: Event): void {

    event.stopPropagation();

    this.editQuestion = true;

    this.editableQuestion = question;

    this.form.setValue({
      question: question.text
    })


  }

  onEditQuestion() {

    

    const indexOfQuestion: number = this.questions.indexOf(this.editableQuestion);

    this.questions[indexOfQuestion].text = this.form.value.question;

    this.editQuestion = false;

    this.editableQuestion = '';
    

  }






}

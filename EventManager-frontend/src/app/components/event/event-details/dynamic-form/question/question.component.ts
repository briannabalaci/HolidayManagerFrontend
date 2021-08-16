import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/shared/data-types/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question!: Question;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.question.id || ''].valid; }

  constructor() { }

  ngOnInit(): void {
  }

}

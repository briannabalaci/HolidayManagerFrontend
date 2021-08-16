import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../data-types/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }

  toFormGroup(questions: Question[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.id || ''] = new FormControl(question.text || '', Validators.required);
    });
    return new FormGroup(group);
  }
}

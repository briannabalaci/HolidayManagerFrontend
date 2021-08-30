import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../data-types/question';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable()
export class QuestionControlService {


  private ENVIRONMENT: string;

  constructor(private httpClient: HttpClient, private environment: EnvService) {
    this.ENVIRONMENT = environment.getEnvironment();
   }

  toFormGroup(questions: Question[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.id || ''] = new FormControl(question.text || '', Validators.required);
    });
    return new FormGroup(group);
  }

  getQuestion(id: number): Observable<Question[]> {
    const path = `${this.ENVIRONMENT}/event/getQuestionsByEventId/`;

    return this.httpClient.get<Question[]>(path + id);

  }
}

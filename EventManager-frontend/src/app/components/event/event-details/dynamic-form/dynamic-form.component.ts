import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/shared/data-types/answer';
import { Invite } from 'src/app/shared/data-types/invite';
import { InviteQuestionResponse } from 'src/app/shared/data-types/invite-question-response';
import { Question } from 'src/app/shared/data-types/question';
import { InviteService } from 'src/app/shared/services/invite.service';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  form!: FormGroup;
  payLoad = '';

  constructor(private questionControlService: QuestionControlService,
              private inviteService: InviteService) { }

  @Input() questions: Question[] = [];
  @Input() invite?: Invite ;

  status: string = 'Not answered';

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    this.form.reset();
  }

  onSubmit() {
    if(this.invite) {
      this.invite.status = this.status;

      if(this.status === 'Accepted') {
        this.invite.inviteQuestionResponses = [];
        for(const q of this.questions) {
          this.invite?.inviteQuestionResponses?.push(
            new InviteQuestionResponse(q, this.getAnswer(q))
          );
        }
      }
    }
    
    this.inviteService.answerInvite(this.invite!).subscribe(
      data => {
        console.log('Invite answered');
        console.log(data);
      }
    );
    
  }

  getAnswer(question: Question): Answer {
    const answerId = this.form.value[question.id || ''];
    for(const answer of question.answerList!) {
      if(answerId === answer.id) {
        return answer;
      }
    }
    return null as unknown as Answer;
  }

  onAccept() {
    this.status = "Accepted";
  }

  onDecline() {
    this.status = "Declined";
  }

}

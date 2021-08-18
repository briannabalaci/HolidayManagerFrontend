import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/shared/data-types/answer';
import { Invite } from 'src/app/shared/data-types/invite';
import { InviteQuestionResponse } from 'src/app/shared/data-types/invite-question-response';
import { Question } from 'src/app/shared/data-types/question';
import { InviteService } from 'src/app/shared/services/invite.service';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import jwt_decode from 'jwt-decode';
import { EventService } from '../../../../shared/services/event.service';
import { Router } from '@angular/router';
import { EventEntity } from '../../../../shared/data-types/event';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  form!: FormGroup;
  payLoad = '';

  constructor(private questionControlService: QuestionControlService,
              private inviteService: InviteService,
              private eventService: EventService,
              private router: Router) { }

  @Input() questions: Question[] = [];
  @Input() invite?: Invite ;
  @Input() event?: EventEntity;
  @Input() canUpdate?: boolean;

  status: string = 'Not answered';

  role: string = '';

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    const token = sessionStorage.getItem('token')!;
    this.role = jwt_decode<any>(token).roles[0];
    this.form.reset();
  }

  onSubmit() {
    if(this.invite) {
      this.invite.status = this.status;

      if(this.status === 'accepted') {
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
    this.status = "accepted";
  }

  onDecline() {
    this.status = "declined";
  }

  onCancel() {
      this.eventService.deleteEvent(this.event?.id!).subscribe(() => {}, err => {
        console.log(err);
      });
  }

  onUpdateEvent() {
      sessionStorage.setItem('event',JSON.stringify(this.event!))
      this.router.navigate(['/event']);
  }

}

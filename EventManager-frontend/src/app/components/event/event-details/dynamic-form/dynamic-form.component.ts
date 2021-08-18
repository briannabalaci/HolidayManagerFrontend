import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/shared/data-types/answer';
import { Invite } from 'src/app/shared/data-types/invite';
import { InviteQuestionResponse } from 'src/app/shared/data-types/invite-question-response';
import { Question } from 'src/app/shared/data-types/question';
import { InviteService } from 'src/app/shared/services/invite.service';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  form!: FormGroup;
  payLoad = '';
  verif: any;
  role: string = '';
  token: string = '';

  constructor(private questionControlService: QuestionControlService,
              private inviteService: InviteService,
              private route: Router) { }

  @Input() questions: Question[] = [];
  @Input() invite?: Invite ;
  @Input() response?: InviteQuestionResponse;

  status: string = 'Not answered';

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    this.form.reset();
    this.token = sessionStorage.getItem('token')!;
    this.role = jwt_decode<any>(this.token).roles[1];
    console.log(this.invite?.status);
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
    //this.route.navigate(['dashboard']);
  }

  onDecline() {
    this.status = "declined";
    //this.route.navigate(['dashboard']);
    // this.inviteService.deleteResponse(this.invite?.id?).subscribe(
    //   data => {

    //   }
    // )
    
  }


  onAcceptStatus(): boolean {
    if(this.invite?.status === "accepted") {
      this.verif = true;
    } else {
      this.verif = false;
    }
    return this.verif;
  }

  onDeclineStatus(): boolean {
    if(this.invite?.status === "declined") {
      this.verif = true;
    } else {
      this.verif = false;
    }
    return this.verif;
  }

  onNotAccepted(): boolean {
    if(this.invite?.status === "Not answered") {
      this.verif = true;
    } else {
      this.verif = false;
    }
    return this.verif;
  }

  onCancelAttendee() {
    this.route.navigate(['dashboard']);
  }

  // onUpdate() {
  //   this.inviteService.updateResponses(this.invite?.inviteQuestionResponses?);
  // }

}

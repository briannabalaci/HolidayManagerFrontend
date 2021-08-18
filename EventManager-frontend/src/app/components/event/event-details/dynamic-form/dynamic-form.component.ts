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
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../message/message.component';
import { ThrowStmt } from '@angular/compiler';

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
    private router: Router,
    private dialog: MatDialog) { }

  @Input() questions: Question[] = [];
  @Input() invite?: Invite;
  @Input() event?: EventEntity;
  @Input() canUpdate?: boolean;

  status: string = 'Not answered';

  role: string = '';

  updatePreferencesForOrganizer: boolean = false;

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    const token = sessionStorage.getItem('token')!;
    this.role = jwt_decode<any>(token).roles[0];
    this.form.reset();

    console.log(this.invite?.inviteQuestionResponses);
  }

  onSubmit() {
    if (this.invite) {
      

      if (this.status === 'accepted' && this.invite.status === 'declined') {
        this.invite.status = this.status;
        this.invite.inviteQuestionResponses = [];

        for (const q of this.questions) {
          this.invite?.inviteQuestionResponses?.push(
            new InviteQuestionResponse(q, this.getAnswer(q))
          );
        }
      
      }

      else if(this.status === 'accepted' && this.invite.status === 'accepted')
      {
        
        this.inviteService.getResponses(this.invite!.id!).subscribe(data => {
          this.invite!.inviteQuestionResponses = data;
          console.log(data + "hello");
        })
        
        let i = 0;
        for (const q of this.questions) {
          
          this.invite!.inviteQuestionResponses![i].answer = this.getAnswer(q);
          i++;
        }
        console.log(this.invite.inviteQuestionResponses![0].id);
      }
      else if(this.status === 'declined' && this.invite.status === 'accepted')
      {
        this.invite!.inviteQuestionResponses = [];
        this.invite.status = 'declined';
      }
    }

    console.log(this.invite?.inviteQuestionResponses);
    this.inviteService.answerInvite(this.invite!).subscribe(
      data => {
        this.invite = data;
        console.log('Invite answered');
        console.log(data);
       
      }
    );
    this.updatePreferencesForOrganizer = false;
    

    

  }

  getAnswer(question: Question): Answer {
    const answerId = this.form.value[question.id || ''];
    for (const answer of question.answerList!) {
      if (answerId === answer.id) {
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

    const dialogRef = this.dialog.open(MessageComponent, {
      data: { component: 'confirmDelete' }
    }
    )

    dialogRef.afterClosed().subscribe(data => {
      if (data === true) {
        this.eventService.deleteEvent(this.event?.id!).subscribe(() => { }, 
        err => { console.log(err);}
        )
      }
    }
    );
  }

  onUpdateEvent() {
    sessionStorage.setItem('event', JSON.stringify(this.event!))
    this.router.navigate(['/event']);

    console.log(this.invite!.inviteQuestionResponses);
  }

  onUpdate() {
    this.updatePreferencesForOrganizer = true;


  }

}

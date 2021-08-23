import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/shared/data-types/answer';
import { Invite } from 'src/app/shared/data-types/invite';
import { InviteQuestionResponse } from 'src/app/shared/data-types/invite-question-response';
import { Question } from 'src/app/shared/data-types/question';
import { InviteService } from 'src/app/shared/services/invite.service';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import { EventService } from '../../../../shared/services/event.service';
import { EventEntity } from '../../../../shared/data-types/event';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../message/message.component';
import { ThrowStmt } from '@angular/compiler';
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
  passed: boolean = false;

  constructor(private questionControlService: QuestionControlService,
    private inviteService: InviteService,
    private eventService: EventService,
    private router: Router,
    private dialog: MatDialog) { }

  @Input() questions: Question[] = [];
  @Input() invite?: Invite;
  @Input() event?: EventEntity;
  @Input() canUpdate?: boolean;
  @Input() response?: InviteQuestionResponse;

  status: string = 'pending';

  updatePreferencesForOrganizer: boolean = false;

  updatePreferencesForAttendee: boolean = false;

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    const token = sessionStorage.getItem('token')!;
    this.role = jwt_decode<any>(token).roles[0]; //might be roles[1]
    this.form.reset();

    if(this.invite?.status === 'pending')
    {
      this.updatePreferencesForAttendee = true;
    }

    const currentDate = new Date();
    const eventDate = new Date(this.event?.eventDate!);

    if (eventDate < currentDate)
      this.passed = true;
}

  onSubmit() {
    if (this.invite) {
      
      
      if (this.status === 'accepted' && ((this.invite.status === 'declined') || (this.invite.status === 'pending'))) {
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
          
        })
        
        let i = 0;
        for (const q of this.questions) {
          
          this.invite!.inviteQuestionResponses![i].answer = this.getAnswer(q);
          i++;
        }
       
      }
      else if(this.status === 'declined' && this.invite.status === 'accepted')
      {
        this.invite!.inviteQuestionResponses = [];
        this.invite.status = 'declined';
      }
      else if(this.status === 'declined' && this.invite.status === 'pending')
      {
        this.invite!.inviteQuestionResponses = [];
        this.invite.status = 'declined';
      }
    }
    this.inviteService.answerInvite(this.invite!).subscribe(
      data => {
        this.invite = data;
       
      }
    );
    this.updatePreferencesForOrganizer = false;
    this.updatePreferencesForAttendee = false;
    
    

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

    
  }

  onUpdate() {
    this.updatePreferencesForOrganizer = true;
    this.status = 'accepted';
  }
  onUpdateAttendee() {​​​​​​​​
    this.updatePreferencesForAttendee = true;
  }​​​​​​​​

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

  onPending(): boolean {
    if(this.invite?.status === "pending") {
      this.verif = true;
    } else {
      this.verif = false;
    }
    return this.verif;
  }

  onCancelAttendee() {
    this.router.navigate(['dashboard']);
  }

 

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invite } from '../data-types/invite';
import { InviteQuestionResponse } from '../data-types/invite-question-response';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private ENVIRONMENT: string;

  constructor(private httpClient: HttpClient, private environment: EnvService) {
    this.ENVIRONMENT = environment.getEnvironment() + '/invites';
   }

  answerInvite(invite: Invite): Observable<Invite> {
    const path = `${this.ENVIRONMENT}/update`;
    return this.httpClient.put<Invite>(path, invite);
  }

  getResponses(id: number): Observable<InviteQuestionResponse[]> {
    const path = `${this.ENVIRONMENT}/getResponses`;
    return this.httpClient.get<InviteQuestionResponse[]>(path + '/' + id);
  }
  getEventStatus(): Observable<Invite[]> {
    const path = `${this.ENVIRONMENT}/getByStatus/${status}`;
    return this.httpClient.get<Invite[]>(path);
  }

  updateResponses(response: InviteQuestionResponse): Observable<any> {
    const path = `${this.ENVIRONMENT}/inviteQuestionResponse/update`
    return this.httpClient.put<InviteQuestionResponse>(path, response);
  }

  deleteResponse(id: number): Observable<any> {
    const path = `${this.ENVIRONMENT}/inviteQuestionResponse/delete/${id}`;
    return this.httpClient.delete<InviteQuestionResponse>(path);
  }

}

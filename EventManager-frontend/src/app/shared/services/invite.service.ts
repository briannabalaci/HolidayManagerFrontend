import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invite } from '../data-types/invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private ENVIRONMENT = "http://localhost:8080/invites";

  constructor(private httpClient: HttpClient) { }

  answerInvite(invite: Invite): Observable<Invite> {
    const path = `${this.ENVIRONMENT}/update`;
    return this.httpClient.put<Invite>(path, invite);
  }
}

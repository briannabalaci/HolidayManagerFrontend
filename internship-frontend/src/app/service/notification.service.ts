import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyNotification } from '../shared/data-type/Notification';
import { parseJwt } from '../utils/JWTParser';
// const URL_BASE = "http://localhost:8090/notification";
const URL_BASE = "http://Runtimeterrorinternshipapp-env.eba-exhqmhri.us-east-1.elasticbeanstalk.com/notification"

const GET_UNSEEN_NOTIFICATIONS = `${URL_BASE}/all-unread`;
const GET_SEEN_NOTIFICATIONS = `${URL_BASE}/all-read`;
const UPDATE_SEEN_NOTIFICATIONS = `${URL_BASE}/seen-all/`;
const DELETE_SEEN_NOTIFICATIONS = `${URL_BASE}/delete-read/`;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  cookieService: any;

  constructor(private httpClient: HttpClient) { }

  public getAllUnseenNotifications(id: number): Observable<MyNotification[]> {
    return this.httpClient.get<MyNotification[]>(GET_UNSEEN_NOTIFICATIONS+'/'+ id.toString());
  }

  public getAllSeenNotifications(id: number): Observable<MyNotification[]> {
    return this.httpClient.get<MyNotification[]>(GET_SEEN_NOTIFICATIONS+'/'+ id.toString());
  }
  public updateSeenNotifications(id: number): Observable<any>{
    let path = UPDATE_SEEN_NOTIFICATIONS + id.toString();
    return this.httpClient.put(path,null,{responseType: 'text'});
  }
  public deleteSeenNotifications(id: number): Observable<any> {
    let path = DELETE_SEEN_NOTIFICATIONS + id.toString();
    return this.httpClient.put(path,null,{responseType: 'text'});
  }
}

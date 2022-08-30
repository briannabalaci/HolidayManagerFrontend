import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_BASE = "http://localhost:8090"
// const URL_BASE = "http://Runtimeterrorinternshipapp-env.eba-exhqmhri.us-east-1.elasticbeanstalk.com"
const CHANGE_PASSWORD = URL_BASE + "/login/change-password"

export class UserChangePasswordData{
  email?:string;
  oldPassword?:string;
  newPassword?:string;
}

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private httpClient: HttpClient) { }

  public changeData(newData: UserChangePasswordData): Observable<any>{
    return this.httpClient.put(CHANGE_PASSWORD,newData, {responseType: 'text'});
  }
}

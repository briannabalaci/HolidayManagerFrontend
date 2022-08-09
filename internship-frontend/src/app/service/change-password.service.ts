import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const CHANGE_PASSWORD = "http://localhost:8090/login/change-password"

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

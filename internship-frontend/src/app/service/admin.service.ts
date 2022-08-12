import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyARecord } from 'dns';
import { stringify } from 'querystring';
import { catchError, map, Observable, tap } from 'rxjs';
import { UpdateUser, User } from '../shared/data-type/User';

const ADD_USER = "http://localhost:8090/user/add-user"
const GET_ALL = "http://localhost:8090/user/get-all-users"
const UPDATE_USER="http://localhost:8090/user/update-user"
const DELETE_USER="http://localhost:8090/user/delete-user/"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/text'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  public createUser(user: User): Observable<string> {
    
    return this.httpClient.post(ADD_USER, user,{responseType:"text"});
 
  }
    
  public deleteUser(email: string): Observable<any>{
    let path = DELETE_USER + email;
    return this.httpClient.delete(path);
  }
  
  public getAllUsers(): Observable<User[]>{
    
    return this.httpClient.get<User[]>(GET_ALL);

  }
  public updateUser(updUser: UpdateUser): Observable<User> {
    return this.httpClient.put<User>(UPDATE_USER, updUser);
  }

}

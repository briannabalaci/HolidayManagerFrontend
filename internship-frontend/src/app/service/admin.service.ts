import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { catchError, map, Observable, tap } from 'rxjs';
import { UpdateUser, User } from '../shared/data-type/User';

const ADD_USER = "http://localhost:8090/user/add-user"
const GET_ALL = "http://localhost:8090/user/get-all-users"
const UPDATE_USER="http://localhost:8090/user/update-user"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  public createUser(user: User): Observable<String> {
    
    return this.httpClient.post<String>(ADD_USER, user);
 
  }
    

  
  public getAllUsers(): Observable<User[]>{
    
    return this.httpClient.get<User[]>(GET_ALL);

  }
  public updateUser(updUser: UpdateUser): Observable<User> {
    return this.httpClient.put<User>(UPDATE_USER, updUser);
  }

}

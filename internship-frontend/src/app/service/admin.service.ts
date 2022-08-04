import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/data-type/User';

const ADD_USER = "http://localhost:8090/user/add-user"
const GET_ALL="http://localhost:8090/user/get-all-users"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  public createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(ADD_USER, user);
  }
  public getAllUsers(): Observable<User[]>{
    
    return this.httpClient.get<User[]>(GET_ALL);

  }
}

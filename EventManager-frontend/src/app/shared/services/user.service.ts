import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data-types/user';
import { Observable } from 'rxjs';

const ENVIRONMENT = "http://localhost:8080";

@Injectable()

export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    const path = `${ENVIRONMENT}/users/getAll`;
    return this.httpClient.get<User[]>(path);
  }

  createUser(user:User): Observable<any> {
    const path = `${ENVIRONMENT}/users/create-user`;
    return this.httpClient.post<User>(path, user);
  }

  deleteUser(id:number): Observable<any> {
    const path = `${ENVIRONMENT}/users/delete/${id}`;
    return this.httpClient.delete<User>(path);
  }

  updateUser(user:User): Observable<any> {
    const path = `${ENVIRONMENT}/users/update`;
    return this.httpClient.put<User>(path, user);
  }
}

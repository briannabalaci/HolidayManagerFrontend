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
}

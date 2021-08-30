import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data-types/user';
import { Observable } from 'rxjs';
import { UserDto } from '../data-types/userDto';
import { Department } from '../data-types/department';

const ENVIRONMENT = "https://service-tr.feedback-internship.de";

@Injectable()

export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    const path = `${ENVIRONMENT}/users/getAll`;
    return this.httpClient.get<User[]>(path);
  }

  getUsersByDepartment(department: string): Observable<any> {
    const path = `${ENVIRONMENT}/users/getByDepartment/${department}`;
    return this.httpClient.get<User[]>(path);
  }

  findByEmail(email: string): Observable<User> {
    const path = `${ENVIRONMENT}/users/findByEmail/${email}`;
    return this.httpClient.get<User>(path);
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

  changePassword(userDto:UserDto): Observable<any> {
    const path = `${ENVIRONMENT}/users/change-password`;
    console.log(this.changePassword);
    return this.httpClient.put<UserDto>(path, userDto);
  }
}

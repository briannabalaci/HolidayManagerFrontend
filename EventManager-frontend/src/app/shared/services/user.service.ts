import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data-types/user';
import { Observable } from 'rxjs';
import { UserDto } from '../data-types/userDto';
import { Department } from '../data-types/department';
import { EnvService } from './env.service';

@Injectable()

export class UserService {

  private ENVIRONMENT: string;

  constructor(private httpClient: HttpClient, private environment: EnvService) {
    this.ENVIRONMENT = environment.getEnvironment();
   }

  getUsers(): Observable<User[]> {
    const path = `${this.ENVIRONMENT}/users/getAll`;
    return this.httpClient.get<User[]>(path);
  }

  getUsersByDepartment(department: string): Observable<any> {
    const path = `${this.ENVIRONMENT}/users/getByDepartment/${department}`;
    return this.httpClient.get<User[]>(path);
  }

  findByEmail(email: string): Observable<User> {
    const path = `${this.ENVIRONMENT}/users/findByEmail/${email}`;
    return this.httpClient.get<User>(path);
  }

  createUser(user:User): Observable<any> {
    const path = `${this.ENVIRONMENT}/users/create-user`;
    return this.httpClient.post<User>(path, user);
  }

  deleteUser(id:number): Observable<any> {
    const path = `${this.ENVIRONMENT}/users/delete/${id}`;
    return this.httpClient.delete<User>(path);
  }

  updateUser(user:User): Observable<any> {
    const path = `${this.ENVIRONMENT}/users/update`;
    return this.httpClient.put<User>(path, user);
  }

  changePassword(userDto:UserDto): Observable<any> {
    const path = `${this.ENVIRONMENT}/users/change-password`;
    console.log(this.changePassword);
    return this.httpClient.put<UserDto>(path, userDto);
  }
}

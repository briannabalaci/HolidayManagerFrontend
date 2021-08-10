import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../data-types/role';

const ENVIRONMENT = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Role[]> {
    const path = `${ENVIRONMENT}/roles/getAll`;
    return this.httpClient.get<Role[]>(path);
  }
}
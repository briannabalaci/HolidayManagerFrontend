import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../data-types/role';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private ENVIRONMENT: string;

  constructor(private httpClient: HttpClient, private environment: EnvService) {
    this.ENVIRONMENT = environment.getEnvironment();
   }

  getRoles(): Observable<Role[]> {
    const path = `${this.ENVIRONMENT}/roles/getAll`;
    return this.httpClient.get<Role[]>(path);
  }
}

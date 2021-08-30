import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../data-types/department';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  ENVIRONMENT: string;

  constructor(private httpClient: HttpClient, private environment: EnvService) {
    this.ENVIRONMENT = environment.getEnvironment();
   }

  getDepartments(): Observable<Department[]> {
    const path = `${this.ENVIRONMENT}/departments/getAll`;
    return this.httpClient.get<Department[]>(path);
  }
}
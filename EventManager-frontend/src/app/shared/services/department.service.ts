import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../data-types/department';

const ENVIRONMENT = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    const path = `${ENVIRONMENT}/departments/getAll`;
    return this.httpClient.get<Department[]>(path);
  }
}
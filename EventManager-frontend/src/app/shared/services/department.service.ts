import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../data-types/department';

const ENVIRONMENT = "https://service-tr.feedback-internship.de";

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
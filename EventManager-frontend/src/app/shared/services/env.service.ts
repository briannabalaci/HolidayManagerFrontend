import { Injectable } from '@angular/core';

const AWS_ENVIRONMENT = "https://service-tr.feedback-internship.de";
const LOCAL_ENVIRONMENT = "http://localhost:8080";

@Injectable()
export class EnvService {

  env: string = LOCAL_ENVIRONMENT;
  
  constructor() { }

  getEnvironment() {
    return this.env;
  }
}

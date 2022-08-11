import {Team} from "./Team";

export enum Role {
  TESTER = 'TESTER',
  DEVELOPER = 'DEVELOPER'
}

export enum UserType {
  ADMIN='ADMIN',
  TEAMLEAD ='TEAMLEAD',
  EMPLOYEE ='EMPLOYEE'
}

export enum Department{
  JAVA='JAVA',
  ABAP ='ABAP',
  BUSINESS_INTELLIGENCE = 'BUSINESS_INTELLIGENCE'
}

export class User {
  id?:number;
  email?:string;
  forname?:string;
  surname?:string;
  department?:Department;
  role?:Role;
  nrHolidays?:number;
  type?:UserType;
  team?:Team;
}

export class UserWithTeamId {
  id?:number;
  email?:string;
  password?:string;
  forname?:string;
  surname?:string;
  department?:Department;
  role?:Role;
  nrHolidays?:number;
  type?:UserType;
  teamId?:number;
}

export class UpdateUser {

  email?: string;
  password?: string;
  forname?: string;
  surname?: string;
  department?: Department;
  role?: Role;
  nrHolidays?: number;
}

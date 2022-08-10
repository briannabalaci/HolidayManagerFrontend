import {User} from "./User";

export enum HolidayType {
  UNPAID_HOLIDAY = 'UNPAID_HOLIDAY',
  REST_HOLIDAY = 'REST_HOLIDAY',
  SPECIAL_HOLIDAY = 'SPECIAL_HOLIDAY'
}


export enum HolidayStatus {
  DENIED = 'DENIED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}


export class Holiday{
  id?:number;
  startDate?:Date;
  endDate?:Date;
  substitute?:string;
  document?:string;
  type?:HolidayType;
  status?:HolidayStatus;
  details?:string;
  user!:User;
}

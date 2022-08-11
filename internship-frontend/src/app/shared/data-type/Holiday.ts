import {User} from "./User";

export enum HolidayType {
  UNPAID_HOLIDAY = 'UNPAID',
  REST_HOLIDAY = 'REST',
  SPECIAL_HOLIDAY = 'SPECIAL'
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

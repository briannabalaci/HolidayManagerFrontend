import {User} from "./User";

export enum HolidayTypeDto {
  UNPAID_HOLIDAY = 'UNPAID',
  REST_HOLIDAY = 'REST',
  SPECIAL_HOLIDAY = 'SPECIAL'
}

export enum HolidayStatusDto {
  DENIED = 'DENIED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  SENT = 'SENT'
}


export class HolidayDto{
  id?:number;
  startDate?:Date;
  endDate?:Date;
  substitute?:string;
  document?: string;
  type?:HolidayTypeDto;
  status?:HolidayStatusDto;
  details?:string;
  user!:User;
}

export class HolidayTypeUserName{
  type:HolidayTypeDto;
  surname:string;
  forname:string;
  teamLeaderId:number;
}

import {User} from "./User";

export class Holiday{
  startDate?: string;
  endDate?: string;
  status?: HolidayStatus;
  document?: number[];
  substitute?:string;
  type?: RequestType;
  user?: User;
}

export class HolidayForUpdate{
  id!: number;
  startDate?: string;
  endDate?: string;
  document?: number[];
  substitute?:string;
}

export enum RequestType {
  REST,
  UNPAID,
  SPECIAL
}
export enum HolidayStatus {
  PENDING,
  APPROVED,
  DENIED
}

export class HolidayTypeView {
    value?: string;
    viewValue?: string;
    constructor(value: string, viewvalue: string) { }
}
export class ReqestStatusView {
  value?: string;
  viewValue?: string;
  constructor(value: string, viewvalue: string) { }
}

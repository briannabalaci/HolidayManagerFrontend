import { User } from "./User";

export class HolidayType {
    value?: string;
    viewValue?: string;
    constructor(value: string, viewvalue: string) { }
  }
  export class Holiday{
    start_date?: string;
    end_date?: string;
    status?: HolidayStatus;
    substitute?:string;
    type?: RequestType;
    user?: User;
  }
  export enum RequestType {
    REST,
    SPECIAL,
    UNPAID
  }
export enum HolidayStatus {
  PENDING,
  APPROVED,
  DENIED
  }
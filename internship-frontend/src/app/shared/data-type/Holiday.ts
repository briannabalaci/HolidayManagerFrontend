import { User } from "./User";

export class HolidayType {
    value?: string;
    viewValue?: string;
    constructor(value: string, viewvalue: string) { }
  }
  export class Holiday{
    startDate?: string;
    endDate?: string;
    status?: HolidayStatus;
    document?: number[];
    substitute?:string;
    type?: RequestType;
    user?: User;
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
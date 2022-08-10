export class HolidayType {
    value?: string;
    viewValue?: string;
    constructor(value: string, viewvalue: string) { }
  }
  export class Holiday{
    startDate?: Date;
    endDate?: Date;
    status?: string;
    substitute?:string;
    type?:RequestType;
  }
  export enum RequestType {
    REST,
    SPECIAL,
    UNPAID
  }
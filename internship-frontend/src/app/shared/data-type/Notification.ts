import { Holiday } from "./Holiday";
import { User } from "./User";

export class MyNotification{
  id?:number;
  sendDate!:Date;
  seen!:Boolean;
  type!:NotificationType;
  receiver!: User;
  sender!: User;
  request!: Holiday;
}

export enum NotificationType{
  APPROVED, SENT, DENIED, MORE_DETAILS
}

import { InviteQuestionResponse } from "./invite-question-response";

export class Invite {
    id?: number;
    userInvited?: string;
    status?: string;
    inviteQuestionResponses?: InviteQuestionResponse[];

    constructor(email:string,status: string = "Not Accepted")
        {
            this.userInvited = email;
            this.status = status;
        }
}
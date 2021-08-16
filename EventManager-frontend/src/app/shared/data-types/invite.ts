export class Invite {
    id?: number;
    userInvited?: string;
    status?: string;

    constructor(email:string,status: string = "Not Accepted")
        {
            this.userInvited = email;
            this.status = status;
        }
}
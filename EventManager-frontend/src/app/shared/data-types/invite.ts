export class Invite {
    email?: string;
    status?: string;

    constructor(email:string,status: string = "Not Accepted")
        {
            this.email = email;
            this.status = status;
        }
}
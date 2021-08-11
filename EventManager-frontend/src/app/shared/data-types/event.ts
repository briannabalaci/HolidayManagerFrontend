import { Invite } from "./invite";
import { Question } from "./question";
import { User } from "./user";

export class EventEntity {
    id?: number;
    title?: string;
    eventDate?: string;
    location?: string;
    dressCode?: string;
    cover_image?: any;
    questions?: Question[];
    invites?: Invite[];
    organizer?: User;


    constructor(title: string,
        eventDate: string,
        location: string,
        dressCode: string,
        questionsLIst: Question[],
        inviteList: Invite[],
        organizer: User) {


        this.title = title;
        this.eventDate = eventDate;
        this.location = location;
        this.dressCode = dressCode;
        this.questions = questionsLIst;
        this.invites = inviteList;
        this.organizer = organizer;
    }

}
import { Invite } from "./invite";
import { Question } from "./question";
import { User } from "./user";

export class EventEntity {
    id?: number;
    title?: string;
    eventDate?: string;
    location?: string;
    dressCode?: string;
    cover_image?: string;
    questions?: Question[];
    invites?: Invite[];
    organizer?: string;
    time_limit: number;


    constructor(title: string,
        eventDate: string,
        location: string,
        dressCode: string,
        cover_image: string,
        questionsLIst: Question[],
        inviteList: Invite[],
        organizer: string,
        time_limit: number) {


        this.title = title;
        this.eventDate = eventDate;
        this.location = location;
        this.dressCode = dressCode;
        this.cover_image = cover_image;
        this.questions = questionsLIst;
        this.invites = inviteList;
        this.organizer = organizer;
        this.time_limit = time_limit;
    }

}
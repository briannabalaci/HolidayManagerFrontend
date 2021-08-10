import { Invite } from "./invite";
import { Question } from "./question";
import { User } from "./user";

export class EventEntity {
    title?: string;
    eventDate?: string;
    location?: string;
    dressCode?: string;
    cover_image?: File;
    questions?: Question[];
    invites?: Invite[];
    organizer?: User;


    constructor(title: string,
        eventDate: string,
        location: string,
        dressCode: string,
        cover_image: File,
        questionsLIst: Question[],
        inviteList: Invite[],
        organizer: User) {


        this.title = title;
        this.eventDate = eventDate;
        this.location = location;
        this.dressCode = dressCode;
        this.cover_image = cover_image;
        this.questions = questionsLIst;
        this.invites = inviteList;
        this.organizer = organizer;
    }

}
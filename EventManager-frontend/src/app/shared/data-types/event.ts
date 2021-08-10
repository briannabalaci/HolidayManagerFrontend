import { Invite } from "./invite";
import { Question } from "./question";

export class EventEntity {
    title?: string;
    eventDate?: string;
    location?: string;
    dressCode?: string;
    cover_image?: File;
    questionsLIst?: Question[];
    inviteList?: Invite[];


    constructor(title: string,
        eventDate: string,
        location: string,
        dressCode: string,
        cover_image: File,
        questionsLIst: Question[],
        inviteList: Invite[]) {


        this.title = title;
        this.eventDate = eventDate;
        this.location = location;
        this.dressCode = dressCode;
        this.cover_image = cover_image;
        this.questionsLIst = questionsLIst;
        this.inviteList = inviteList;
    }

}
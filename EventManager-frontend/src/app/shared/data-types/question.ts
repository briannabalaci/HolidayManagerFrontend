import { Answer } from "./answer";

export class Question {
    id?: number;
    text?: string;
    answerList?: Answer[];

    constructor(text: string, answerList: Answer[]) {
        this.text = text;
        this.answerList = answerList;
    }
}
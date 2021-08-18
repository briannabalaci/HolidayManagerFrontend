import { Answer } from "./answer";
import { Question } from "./question";

export class InviteQuestionResponse {

    id?: number;
    question?: Question;
    answer?: Answer;

    constructor(question: Question, answer: Answer) {
        this.question = question;
        this.answer = answer;
    }
}

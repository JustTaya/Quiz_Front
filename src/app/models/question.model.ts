import { Answer } from './answer.model';

export enum QuestionType {
    OPTION = "Option",
    BOOLEAN = "Boolean",
    ANSWER = "Answer",
    SEQUENCE = "Sequence"
}

export interface Question {
    id: number,
    quizId: number,
    type: string,
    text: string,
    active: boolean,
    image: string,
    answerList: Answer[],
    changed: boolean,
    deleted: boolean
} 
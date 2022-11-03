import { Question } from './question.model';

export interface Answer {
    id: number,
    questionId: number,
    text: string,
    correct: boolean,
    nextAnswerId: number
    //TODO: add image
}
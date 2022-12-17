export interface Answer {
    id: number,
    questionId: number,
    image: string;
    text: string,
    correct: boolean,
    nextAnswerId: number,
    changed: boolean,
    deleted: boolean
}

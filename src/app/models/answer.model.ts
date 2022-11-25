export interface Answer {
    id: number,
    questionId: number,
    text: string,
    correct: boolean,
    nextAnswerId: number
    //TODO: add image
}

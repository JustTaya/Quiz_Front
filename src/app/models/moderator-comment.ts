export class ModeratorComment {
  quizId: number;
  moderatorId: number;
  comment: string;
  commentDate: Date;

  constructor(quizId: number, moderatorId: number, comment: string, commentDate: Date) {
    this.quizId = quizId;
    this.comment = comment;
    this.commentDate = commentDate;
    this.moderatorId = moderatorId;
  }
}

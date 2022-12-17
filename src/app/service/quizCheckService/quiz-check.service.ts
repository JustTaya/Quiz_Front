import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModeratorComment} from "../../models/moderator-comment";
import {QuizInfo} from "../../models/quiz-info";
import {StatusType} from "../../models/status-type.enum";

class QuizCheckModel {
}

@Injectable({
  providedIn: 'root'
})
export class QuizCheckService {
  private BASE_URL = window["configureApiBaseUrl"];
  private QUIZZES_URL = `${this.BASE_URL}\\quizzes\\quizCheck\\`;
  private UPDATE_QUIZ_STATUS_URL = `${this.BASE_URL}\\quizzes\\update\\status\\`;
  private ADD_MODERATOR_COMMENT_URL = `${this.BASE_URL}\\quizzes\\addComment\\`;
  private ASSIGN_QUIZ = `${this.BASE_URL}\\quizzes\\assignment\\`;
  private UNSIGN_QUIZ_URL = `${this.BASE_URL}\\quizzes\\unsign\\`;
  private GET_COMMENTS_URL = `${this.BASE_URL}\\quizzes\\comments\\`;
  private QUIZZES_INFO_URL = `${this.BASE_URL}\\quizzes\\info\\`;

  constructor(private http: HttpClient) {
  }

  getQuizById(id: string): Observable<QuizCheckModel>{
    return this.http.get<QuizCheckModel>(this.QUIZZES_URL + id);
  }

  updateStatusQuiz(id, status: StatusType): Observable<any>{
    return this.http.post(this.UPDATE_QUIZ_STATUS_URL + id, status);
  }
  addComment(comment: ModeratorComment): Observable<any>{
    return this.http.post(this.ADD_MODERATOR_COMMENT_URL, comment);
  }
  assignQuiz(quizId, moderatorId): Observable<any> {
    return this.http.post(this.ASSIGN_QUIZ + quizId, moderatorId);
  }
  unsignQuiz(currentQuizId: number) {
    return this.http.delete(this.UNSIGN_QUIZ_URL + currentQuizId);
  }
  getCommentHistory(currentQuizId: string): Observable<any> {
    return this.http.get(this.GET_COMMENTS_URL + currentQuizId);
  }
  getQuizInfoById(id: string){
    return this.http.get<QuizInfo>(this.QUIZZES_INFO_URL + id);
  }
}

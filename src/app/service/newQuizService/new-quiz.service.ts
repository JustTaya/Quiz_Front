import { Quiz } from './../../models/add-quiz.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewQuizService {
  private BASE_URL = window["configureApiBaseUrl"];
  private NEW_QUIZ_URL = `${this.BASE_URL}\\quizzes\\new_quiz`;
  private QUIZZES_INFO = `${this.BASE_URL}\\quizzes\\info\\`;

  constructor(private http: HttpClient) { }

  postQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.NEW_QUIZ_URL, quiz);
  }

  getQuizInfo(quizId: string): Observable<Quiz> {
    return this.http.get<Quiz>(this.QUIZZES_INFO + quizId);
  }
}

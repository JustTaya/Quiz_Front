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


  constructor(private http: HttpClient) { }

  postQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.NEW_QUIZ_URL, quiz);
  }
}
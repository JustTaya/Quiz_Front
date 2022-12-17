import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Quiz} from "../../models/quiz.model";
import {AuthenticationService} from "../loginService/authentication.service";
import {CurrentUserService} from "../current-user.service";
import { QuizInfo } from "../../models/quiz-info";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private BASE_URL = window["configureApiBaseUrl"];
  private QUIZZES_URL = `${this.BASE_URL}\\quizzes`;
  private QUIZZES_INFO_URL = `${this.BASE_URL}\\quizzes\\info\\`;
  private GET_QUIZ_BY_CATEGORY = `${this.QUIZZES_URL}\\categories\\`;
  private GET_FILTERED_QUIZ = `${this.QUIZZES_URL}\\filter\\`;
  private MARK_QUIZ_AS_FAVORITE = `${this.QUIZZES_URL}\\mark\\`;
  private UNMARK_QUIZ_AS_FAVORITE = `${this.QUIZZES_URL}\\unmark\\`;
  private GET_RECOMMENDED_QUIZZES = `${this.QUIZZES_URL}\\recommendations\\`;
  private GET_POPULAR_QUIZZES = `${this.QUIZZES_URL}\\popular\\`;
  private UNSIGN_ALL_MODERATOR_QUIZ_URL = `${this.QUIZZES_URL}\\unsignAll\\`;

  constructor(private http: HttpClient,
    private authService: AuthenticationService,
    private currentUserService: CurrentUserService) { }

  getQuizzes(pageSize: number, pageIndex: number): Observable<any> {
    if (!pageIndex) { pageIndex = 0; }
    return this.http.get<Quiz[]>(this.QUIZZES_URL + '/' + pageSize + '/' + pageIndex + '/' + (this.authService.logIn ? this.currentUserService.getCurrentUser().id : 0));
  }

  getQuizById(id: string) {
    return this.http.get<Quiz>(this.QUIZZES_URL + id);
  }

  getQuizInfoById(id: string) {
    return this.http.get<QuizInfo>(this.QUIZZES_INFO_URL + id);
  }

  getQuizzesByCategory(categoryId: number, pageSize: number, pageIndex: number): Observable<any> {
    return this.http.get(this.GET_QUIZ_BY_CATEGORY + categoryId + '/' + pageSize + '/' + pageIndex + '/' + (this.authService.logIn ? this.currentUserService.getCurrentUser().id : 0));
  }

  getFilteredQuizzes(searcText: string, pageSize: number, pageIndex: number): Observable<any> {
    return this.http.get(this.GET_FILTERED_QUIZ + searcText + '/' + pageSize + '/' + pageIndex + '/' + (this.authService.logIn ? this.currentUserService.getCurrentUser().id : 0));
  }

  markQuizAsFavorite(quizId: string, userId: string): Observable<any> {
    return this.http.post(this.MARK_QUIZ_AS_FAVORITE + quizId + '/' + userId, "");
  }

  unmarkQuizAsFavorite(quizId: string, userId: string): Observable<any> {
    return this.http.post(this.UNMARK_QUIZ_AS_FAVORITE + quizId + '/' + userId, "");
  }

  getRecommendedQuizzes(limit: number): Observable<any> {
    return this.http.get<Quiz[]>(this.GET_RECOMMENDED_QUIZZES + this.currentUserService.getCurrentUser().id + '?limit=' + limit);
  }

  RecommendationForAnonimus(limit: number): Observable<any> {
    return this.http.get<Quiz[]>(this.GET_POPULAR_QUIZZES + limit);
  }
  unsignAllQuiz(moderatorId: number) {
    return this.http.delete(this.UNSIGN_ALL_MODERATOR_QUIZ_URL + moderatorId);
  }
}

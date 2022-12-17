import { Quiz } from './../../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private BASE_URL = window['configureApiBaseUrl'];
  private TOP_QUIZZES = `${this.BASE_URL}\\quizzes\\top_quizzes`;
  private RECENT_QUIZZES = `${this.BASE_URL}\\quizzes\\recent_quizzes`;
  private GET_RATING = `${this.BASE_URL}\\api\\users\\rating\\`;
  private GET_ACHIEVEMENTS_TOTAL = `${this.BASE_URL}\\achievements\\count_total`;
  private GET_ACHIEVEMENTS_FOR_USER = `${this.BASE_URL}\\achievements\\count\\`;
  private GET_RECOMMENDATIONS = `${this.BASE_URL}\\quizzes\\recommendations\\`;
  private GET_QUIZ_IMAGE = `${this.BASE_URL}\\quizzes\\get_image\\`;


  constructor(private http: HttpClient) { }

  getTopQuizzes(limit: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.TOP_QUIZZES + "?limit=" + limit);
  }

  getTopQuizzesByCategory(categoryId: number, limit: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.TOP_QUIZZES + '/' + categoryId + "?limit=" + limit);
  }

  getRecentQuizzes(userId: number, limit: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.RECENT_QUIZZES + '/' + userId + "?limit=" + limit);
  }

  getRating(userId: Number): Observable<number> {
    return this.http.get<number>(this.GET_RATING + userId);
  }

  getAchievementsTotal(): Observable<number> {
    return this.http.get<number>(this.GET_ACHIEVEMENTS_TOTAL);
  }

  getAchievementsForUser(userId: number): Observable<number> {
    return this.http.get<number>(this.GET_ACHIEVEMENTS_FOR_USER + userId);
  }

  getRecommendations(userId: number, limit: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.GET_RECOMMENDATIONS + userId + "?limit=" + limit);
  }

  getQuizImage(quizId: number): Observable<any> {
    return this.http.get<any>(this.GET_QUIZ_IMAGE + quizId);
  }
}

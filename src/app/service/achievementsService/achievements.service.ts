import { Achievement } from '../../models/achievement.model';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private BASE_URL = window['configureApiBaseUrl'];
  private GET_ACHIEVEMENTS = `${this.BASE_URL}\\achievements`;
  private GET_ACHIEVEMENT_CATEGORIES = `${this.BASE_URL}\\achievements\\categories`;
  private GET_ACHIEVEMENTS_BY_CATEGORY = `${this.BASE_URL}\\achievements\\by_category\\`;

  constructor(private http: HttpClient) { }

  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.GET_ACHIEVEMENTS);
  }

  getAchievementCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.GET_ACHIEVEMENT_CATEGORIES);
  }

  getAchievementsByCategory(categoryId: number): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.GET_ACHIEVEMENTS_BY_CATEGORY + categoryId);
  }

  getAchievementsByUser(userId: number): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.GET_ACHIEVEMENTS + `\\` + userId);
  }
}

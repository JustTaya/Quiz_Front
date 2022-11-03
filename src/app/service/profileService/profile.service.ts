import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {Quiz} from '../../models/quiz';
import {NotificationStatus} from '../../models/notification-status.enum';
import {CurrentUserService} from "../current-user.service";



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private BASE_URL = window['configureApiBaseUrl'];
  private PROFILE_URL = `${this.BASE_URL}\\profile\\myprofile\\`;
  private FRIEND_LIST_URL = `${this.BASE_URL}\\profile\\myfriends\\`;
  private UPDATE_PROFILE_URL = `${this.BASE_URL}\\profile\\myprofile\\update`;
  private UPDATE_PASSWORD_URL = `${this.BASE_URL}\\profile\\updatePassword\\`;
  private GET_QUIZZES_URL = `${this.BASE_URL}\\profile\\myquizzes\\`;
  private GET_FAVORITE_URL = `${this.BASE_URL}\\profile\\myfavorite\\`;
  private GET_CATEGORY_NAME = `${this.BASE_URL}\\profile\\category\\`;
  private UPDATE_USER_IMAGE = `${this.BASE_URL}\\profile\\newicon\\`;
  private GET_USER_IMAGE_BY_USER_ID = `${this.BASE_URL}\\profile\\getimage\\`;
  private UPDATE_GET_NOTIFICATION = `${this.BASE_URL}\\profile\\status\\`;
  private userId = this.currentUserService.getCurrentUser().id;

  constructor(private http: HttpClient,
              private currentUserService: CurrentUserService) { }

  getProfile(userId: string): Observable<User> {
    return this.http.get<User>(this.PROFILE_URL + userId);
  }

  updateProfile(user: User): Observable<User> {
    user.id = this.userId;
    return this.http.post<User>(this.UPDATE_PROFILE_URL, user);
  }

  updatePassword(newPassword: string): Observable<any> {
    return this.http.post(this.UPDATE_PASSWORD_URL + this.userId, newPassword);
  }

  getFriends(pageSize: number, pageNumber: number, sortDirection: any): Observable<any>{
    return this.http.get<User[]>(this.FRIEND_LIST_URL + pageSize + '/' + pageNumber + '/' + this.userId + '?sort=' + (sortDirection==undefined? "": sortDirection.active + ' ' + sortDirection.direction));  //active direction
  }

  getUserQuizzes(pageSize: number, pageNumber: number, sortDirection: any): Observable<any>{
    return this.http.get<Quiz[]>(this.GET_QUIZZES_URL + pageSize + '/' + pageNumber + '/' + this.userId +'?sort=' + (sortDirection==undefined? "": sortDirection.active + ' ' + sortDirection.direction));
  }

  getFavoriteGames(pageSize: number, pageNumber: number): Observable<any>{
    return this.http.get<Quiz[]>(this.GET_FAVORITE_URL + this.userId + '/' + pageSize + '/' + pageNumber);
  }

  getCategoryName(categoryId: string): Observable<any> {
    return this.http.get(this.GET_CATEGORY_NAME + categoryId);
  }

  updateImage(image: File): Observable<any> {
    const uploadImg = new FormData();
    uploadImg.append('image', image);
    return this.http.post(this.UPDATE_USER_IMAGE + this.userId, uploadImg);
  }

  getProfileImage(id: string): Observable<any> {
    return this.http.get(this.GET_USER_IMAGE_BY_USER_ID + id);
  }

  updateNotificationStatus(status: NotificationStatus): Observable<any> {
    return this.http.post(this.UPDATE_GET_NOTIFICATION + this.userId, status);
  }

  getUserNotificationStatus(): Observable<NotificationStatus> {
    return this.http.get<NotificationStatus>(this.UPDATE_GET_NOTIFICATION + this.userId);
  }

  filterFriendsRequest(userSearch: string, pageSize: number, pageIndex: number, sortDirection: any): Observable<any> {
    return this.http.get(this.FRIEND_LIST_URL + userSearch + '/' + pageSize + '/' + pageIndex + '/' + this.userId +'?sort=' + (sortDirection==undefined? "": sortDirection.active + ' ' + sortDirection.direction));
  }

  filterQuizzesRequest(userSearch: string, pageSize: number, pageIndex: number, sortDirection: any): Observable<any> {
    return this.http.get(this.GET_QUIZZES_URL+ userSearch + '/' + pageSize + '/' + pageIndex + '/' + this.userId +'?sort=' + (sortDirection==undefined? "": sortDirection.active + ' ' + sortDirection.direction));
  }

  filterFavoriteRequest(userSearch: string, pageSize: number, pageIndex: number): Observable<any>{
    return this.http.get(this.GET_QUIZZES_URL+ userSearch + '/' + pageSize + '/' + pageIndex + '/' + this.userId);
  }
}

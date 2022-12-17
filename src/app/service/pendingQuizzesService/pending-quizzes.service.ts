import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatusType} from "../../models/quiz.model";
import {AuthenticationService} from "../loginService/authentication.service";
import {CurrentUserService} from "../current-user.service";


@Injectable({
  providedIn: 'root'
})
export class PendingQuizzesService {

  private BASE_URL = window['configureApiBaseUrl'];
  private PENDING_QUIZZES_URL = `${this.BASE_URL}\\quizzes\\status\\`;
  private ASSIGNED_QUIZZES_URL = `${this.BASE_URL}\\quizzes\\moderatorQuizzes\\`;
  private GET_FILTERED_PENDING_QUIZZES_URL = `${this.BASE_URL}\\quizzes\\filter\\`;

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private currentUserService: CurrentUserService) { }

  getPendingQuizzes(pageSize: number, pageIndex: number): Observable<any> {
    return this.http.get(this.PENDING_QUIZZES_URL + StatusType.PENDING + '/' + pageSize + '/' + pageIndex);
  }


  getAssignedQuizzes(moderatorId, pageSize: number, pageIndex: number): Observable<any> {
    return this.http.get(this.ASSIGNED_QUIZZES_URL  + moderatorId + '/' + pageSize + '/' + pageIndex);
  }


  getFilteredPendingQuizzes(searchText: string, pageSize: number, pageIndex: number): Observable<any> {
    return this.http.get(this.GET_FILTERED_PENDING_QUIZZES_URL + searchText + '/' + pageSize + '/' + pageIndex );
  }
}

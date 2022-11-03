import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private BASE_URL = window["configureApiBaseUrl"];
  private INSERT_TAG = `${this.BASE_URL}\\quizzes\\tags\\new`;
  private ADD_TAG_TO_QUIZ = `${this.BASE_URL}\\quizzes\\add_tag?`;

  constructor(private http: HttpClient) { }

  postTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.INSERT_TAG, tag);
  }

  addTagToQuiz(quizId: number, tagId: number): Observable<any> {
    return this.http.post(this.ADD_TAG_TO_QUIZ + "quizId=" + quizId + "&tagId=" + tagId, null);
  }
}

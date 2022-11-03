import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from 'src/app/models/answer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private BASE_URL = window["configureApiBaseUrl"];
  private NEW_ANSWER_URL = `${this.BASE_URL}\\quiz\\answer\\new`;
  private UPDATE_ANSWER_URL = `${this.BASE_URL}\\quiz\\answer\\update`;
  private UPDATE_ANSWER_IMAGE = `${this.BASE_URL}\\quiz\\answer\\new_image\\`;

  constructor(private http: HttpClient) { }

  postAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.NEW_ANSWER_URL, answer);
  }

  updateImage(answerId: number, image: File): Observable<any> {
    const uploadImg = new FormData();
    uploadImg.append('image', image);
    return this.http.post(this.UPDATE_ANSWER_IMAGE + answerId, uploadImg);
  }

  updateAnswer(answer: Answer): Observable<any> {
    return this.http.post<Answer>(this.UPDATE_ANSWER_URL, answer);
  }
}

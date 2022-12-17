import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private BASE_URL = window["configureApiBaseUrl"];
  private UPDATE_QUESTION_IMAGE = `${this.BASE_URL}\\quiz\\question\\new_image\\`;
  private GET_QUESTIONS = `${this.BASE_URL}\\quiz\\question\\quiz\\`;

  constructor(private http: HttpClient) { }

  updateImage(questionId: number, image: File): Observable<any> {
    const uploadImg = new FormData();
    uploadImg.append('image', image);
    return this.http.post(this.UPDATE_QUESTION_IMAGE + questionId, uploadImg);
  }

  getQuestions(id: string): Observable<Question[]> {
    console.log('service ' + this.http.get<Question[]>(this.GET_QUESTIONS + id));
    return this.http.get<Question[]>(this.GET_QUESTIONS + id);
  }
}

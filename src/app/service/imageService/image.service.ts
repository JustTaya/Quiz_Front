import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private BASE_URL = window['configureApiBaseUrl'];
  private SAVE_IMAGE = `${this.BASE_URL}\\image`;


  constructor(private http: HttpClient) {
  }

  saveImage(image: File): Observable<any> {
    if (image == null) {
      return of("");
    }
    const uploadImg = new FormData();
    uploadImg.append('image', image);
    return this.http.post(this.SAVE_IMAGE, uploadImg, { responseType: 'text' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private BASE_URL = window['configureApiBaseUrl'];
  private GET_RATING = `${this.BASE_URL}\\api\\users\\rating`;
  private GET_RATING_IN_RANGE = `${this.BASE_URL}\\api\\users\\rating\\range\\`;


  constructor(private http: HttpClient) { }

  getRating(from: number, to: number): Observable<User[]> {
    return this.http.get<User[]>(this.GET_RATING + "?from=" + from + "&to=" + to);
  }

  getRatingRange(userId: number, range: number): Observable<User[]> {
    return this.http.get<User[]>(this.GET_RATING_IN_RANGE + userId + "?range=" + range);
  }
}

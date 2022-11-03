import { Category } from './../../models/category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BASE_URL = window["configureApiBaseUrl"];
  private CATEGORIES_URL = `${this.BASE_URL}\\categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(this.CATEGORIES_URL);
  }

  getCategoryByName(name: String) {
    return this.http.get(`${this.CATEGORIES_URL}\\${name}`);
  }
}

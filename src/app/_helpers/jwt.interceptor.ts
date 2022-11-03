import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('currentUser') == null){
      return next.handle(request);
    }

    const resultRequest = request.clone({
      headers: request.headers.append('authorization', `${JSON.parse(localStorage.getItem('currentUser')).token}`)});
    return next.handle(resultRequest);
  }
}

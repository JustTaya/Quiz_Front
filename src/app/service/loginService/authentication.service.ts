import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ShareIdService} from '../profileService/share-id.service';
import {CurrentUserService} from "../current-user.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {UserActive} from "../../models/user-active";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private BASE_URL = window["configureApiBaseUrl"];
  private LOGIN_API_URL = `${this.BASE_URL}\\auth\\login`;
  private USER_BY_CODE_URL = `${this.BASE_URL}\\api\\users\\activate\\`;
  private SET_PASSWORD_URL = `${this.BASE_URL}\\profile\\updatePassword\\`;

  constructor(private http: HttpClient,
              private router: Router,
              private shareId: ShareIdService,
              private currentUserService: CurrentUserService) { }

  login(email: string, password: string) {


    this.http.post(this.LOGIN_API_URL, {email, password})
        .subscribe((resp: any) => {
              localStorage.setItem('currentUser', JSON.stringify(resp));
              this.shareId.setId(JSON.parse(localStorage.getItem('currentUser')).id);
              window.location.replace('/');
            },
            error => {
              alert(error.error['message']);
            });

  }


  logout() {
    localStorage.removeItem('currentUser');
    window.location.replace('/dashboard');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('currentUser') != null);
  }

  getUserbyCode(code: string): Observable<User>{
    return this.http.get<User>(this.USER_BY_CODE_URL + code);
  }
  setPassword(userId: string, newPassword: string): Observable<any>{
    return this.http.post(this.SET_PASSWORD_URL + userId, newPassword);
  }

}

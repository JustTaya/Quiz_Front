import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentUserService} from "../current-user.service";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private BASE_URL = window["configureApiBaseUrl"];
  private GET_ANNOUNCEMENT = `${this.BASE_URL}\\announce\\dash\\`;

  constructor(private currentUserService: CurrentUserService,
              private http: HttpClient) {
  }


  getAnnouncement(): Observable<any> {
    return this.http.get(this.GET_ANNOUNCEMENT + "?userId=" + this.currentUserService.getCurrentUser().id)
  }
}

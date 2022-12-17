import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {Quiz} from '../../models/quiz';
import {NotificationStatus} from '../../models/notification-status.enum';


@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
  private BASE_URL = window['configureApiBaseUrl'];


}

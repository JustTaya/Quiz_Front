import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from './../service/profileService/profile.service';
import {Observable} from 'rxjs';
import {CategoryService} from './../service/categoryService/category.service';
import {DashboardService} from './../service/dashboardService/dashboard.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Quiz} from '../models/quiz.model';
import {Category} from '../models/category.model';
import {MatSidenav} from '@angular/material/sidenav';
import {map} from 'rxjs/operators'
import {CurrentUserService} from "../service/current-user.service";
import {Announcement} from "../models/announcement";
import {AnnouncementService} from "../service/announcementService/announcement.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('ratingNavbar') ratingNavbar: MatSidenav;
  @ViewChild('achievementsNavbar') achievementsNavbar: MatSidenav;

  ratingIsOpen: boolean = false;
  achievementIsOpen: boolean = false;


  maxCards: number = 5;
  userId: number = parseInt(this.currentUserService.getCurrentUser().id);

  profileImage: Observable<any>;

  recentQuizzes: Observable<Quiz[]>;
  topQuizzes: Observable<Quiz[]>;
  recommendationQuizzes: Observable<Quiz[]>;

  imageMap = new Map<number, Observable<any>>();

  categories: Observable<Category[]> = this.categoryService.getCategories();
  quizCategory: number = -1;

  rating: Observable<number>;

  achievementsTotal: Observable<number>;
  achievementsForUser: Observable<number>;

  announcement: Announcement[];

  constructor(private dashboardService: DashboardService,
              private categoryService: CategoryService,
              private profileService: ProfileService,
              private sanitizer: DomSanitizer,
              private currentUserService: CurrentUserService,
              private annoService: AnnouncementService) {
  }

  ngOnInit(): void {
    this.profileService.getProfileImage(this.userId.toString()).subscribe(
      (resp => this.profileImage = resp.text)
    );

    this.recentQuizzes = this.dashboardService.getRecentQuizzes(this.userId, this.maxCards);

    this.topQuizzes = this.dashboardService.getTopQuizzes(this.maxCards);

    this.recommendationQuizzes = this.dashboardService.getRecommendations(this.userId, this.maxCards);

    this.rating = this.dashboardService.getRating(this.userId);

    this.achievementsTotal = this.dashboardService.getAchievementsTotal();
    this.achievementsForUser = this.dashboardService.getAchievementsForUser(this.userId);

    this.annoService.getAnnouncement().subscribe(
      resp => {console.log(resp); this.announcement = resp;}
    );
    //console.log(this.announcement);
  }

  achievementsOpen(): void {
    if (this.ratingIsOpen) {
      this.ratingNavbar.close();
      this.ratingIsOpen = false;
    }

    this.achievementIsOpen = true;
    setTimeout(() => {
      this.achievementsNavbar.open();
    }, 0);

  }

  ratingOpen(): void {
    if (this.achievementIsOpen) {
      this.achievementsNavbar.close();
      this.achievementIsOpen = false;
    }

    this.ratingIsOpen = true;
    setTimeout(() => {
      this.ratingNavbar.open();
    }, 0);
  }

  achievementsClose(): void {
    this.achievementsNavbar.close();
    this.achievementIsOpen = false;
  }

  ratingClose(): void {
    this.ratingNavbar.close();
    this.ratingIsOpen = false;
  }

  closeAll(): void {
    if (this.ratingIsOpen) {
      this.ratingNavbar.close();
    }
    if (this.achievementIsOpen) {
      this.achievementsNavbar.close();
    }
  }

  onQuizCategorySelected(value: number): void {
    if (value === -1) {
      this.topQuizzes = this.dashboardService.getTopQuizzes(this.maxCards);
    } else {
      this.topQuizzes = this.dashboardService.getTopQuizzesByCategory(value, this.maxCards);
    }
  }

  getQuizImage(quizId: number): Observable<any> {
    if (!this.imageMap.get(quizId)) {
      this.imageMap.set(quizId, this.dashboardService.getQuizImage(quizId).pipe(
        map(resp => resp.text)));
    }
    return this.imageMap.get(quizId);
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import { User } from "../../models/user";
import { ProfileService } from "../../service/profileService/profile.service";
import { ShareIdService } from "../../service/profileService/share-id.service";
import { PlatformLocation } from "@angular/common";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import {Role} from '../../models/role.enum';
import {QuizCheckService} from "../../service/quizCheckService/quiz-check.service";
import {Quiz} from "../../models/pending-quizzes.model";
import {MatTableDataSource} from "@angular/material/table";
import {QuizService} from "../../service/quizService/quiz.service";


@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  floatLabelControl = new FormControl('auto');
  public profile: User;
  public isEditForm = false;
  currentUserId: string;
  id: string;
  roleUs: Role;
  public isAdmin = false;
  public isModerator = false;
  public isSuperAdmin = false;
  public isUser = false;
  assignedQuizzes: Quiz[];
  displayedColumns: string[] = ['name', 'category', 'date', 'actions'];
  dataSource: MatTableDataSource<Quiz>;

  constructor(private profileService: ProfileService,
              private shareId: ShareIdService,
              private location: PlatformLocation,
              private router: Router,
              private quizCheckService: QuizCheckService,
              private quizService: QuizService) {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.id = shareId.shareId();
    this.shareId.setEmail(JSON.parse(localStorage.getItem('currentUser')).email);
    this.roleUs = JSON.parse(localStorage.getItem('currentUser')).role;

  }

  adminCheck() {
    switch (this.roleUs.toString()) {
      case Role[Role.ADMIN]:
        this.isAdmin = true;
        break;
      case Role[Role.MODERATOR]:
        this.isModerator = true;
        break;
      case Role[Role.SUPER_ADMIN]:
        this.isSuperAdmin = true;
        break;
      default:
        this.isUser = true;
        break;
    }
  }

  ngOnInit(): void {
    this.getProfile(this.id);
    this.adminCheck();
    this.location.onPopState(() => {
      this.shareId.setId(this.currentUserId);
      this.shareId.setEmail(JSON.parse(localStorage.getItem('currentUser')).email);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['profile', this.currentUserId, {outlets: {profilenav: 'profinfo'}}]);
      });
    });
    this.getAssignedQuizzes();
  }

  closeEditForm() {
    this.isEditForm = false;
  }

  ngSubmit() {
    if (this.id === this.currentUserId) {
      this.saveProfile();
    } else {
      this.updateAdminUser();
    }
    this.closeEditForm();
  }

  public getProfile(id: string) {
    this.profileService.getProfile(id).subscribe(
      (resp: any) => {
        this.adminCheck();
        this.profile = resp;
      },
      error => {
        console.log(error);
        alert('Something wrong with downloading profile');
      }
    );
  }

  updateAdminUser() {
    this.profile.id = this.id;
    this.profileService.updateAdminUser(this.profile).subscribe(
      (resp: any) => {
        this.profile = resp;
      },
      error => {
        alert('Something wrong while updating profile');
      }
    );
  }

  saveProfile() {
    this.profileService.updateProfile(this.profile).subscribe(
      (resp: any) => {
        this.profile = resp;
      },
      error => {
        alert('Something wrong while updating profile');
      }
    );
  }

  getAssignedQuizzes() {
    this.profileService.getAssignedQuizzes(this.id).subscribe(resp => {
      this.assignedQuizzes = resp;
    });
  }
  unsignModeratorQuiz(id) {
    this.quizCheckService.unsignQuiz(id).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['profile', this.id, {outlets: {profilenav: 'profinfo'}}]);
        });
      },
      error => {
        alert('Something wrong while unsign');
      }
    );
  }
  unsignAllModeratorQuiz(id) {
      this.quizService.unsignAllQuiz(id).subscribe(
        (resp: any) => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['profile', this.id, {outlets: {profilenav: 'profinfo'}}]);
          });
        },
        error => {
          alert('Something wrong while unsign');
        }
      );
    }

}




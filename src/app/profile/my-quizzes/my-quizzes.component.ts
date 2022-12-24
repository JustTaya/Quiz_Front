import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../service/profileService/profile.service';
import {PageEvent} from "@angular/material/paginator";
import {Quiz} from "../../models/quiz";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {RejectMessagesDialogComponent} from "./reject-messages-dialog/reject-messages-dialog.component";
import { NewQuizService } from 'src/app/service/newQuizService/new-quiz.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent implements OnInit {
  userQuizzes: Quiz[];
  displayedColumns: string[] = ['name', 'category', 'status', 'actions'];
  public userRequest: string;
  userQuestionUpdate = new Subject<string>();
  sortDirection = undefined;

  length = 0;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [8, 16, 24];

  rejectedQuizzes: Quiz[];
  rejectedSortDirection = undefined;
  rejectedLength = 0;
  rejectedPageIndex: number;
  rejectedPageSize: number;
  rejectedPageSizeOptions: number[] = [8, 16, 24];


  constructor(private profileService: ProfileService,
              public dialog: MatDialog,
              private quizService: NewQuizService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setPaginationParamDefault();
    this.getUserQuizzes();

    this.setPaginationRejectedParamDefault();
    this.getUserRejectedQuizzes();

    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(userSearch => {
        if (userSearch.length == 0) {
          this.setPaginationParamDefault();
          this.getUserQuizzes();
        } else {
          this.filterQuizzes(userSearch);
        }
      });
  }

  getUserQuizzes() {
    this.profileService.getUserQuizzes(this.pageSize, this.pageIndex, this.sortDirection).subscribe(
      resp => {
        this.userQuizzes = resp.responceList;
        this.length = resp.totalNumberOfElement;
      });
  }

  setPaginationParamDefault() {
    this.pageIndex = 0;
    this.pageSize = 8;
  }

  onPageChanged($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.choseRequest();
  }

  filterQuizzes(userSearch: string) {
    this.profileService.filterQuizzesRequest(userSearch, this.pageSize, this.pageIndex, this.sortDirection).subscribe(
      resp => {
        this.userQuizzes = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }

  choseRequest() {
    if (this.userRequest != undefined && this.userRequest) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.filterQuizzes(this.userRequest);
    } else {
      this.getUserQuizzes();
    }
  }

  sortQuizzes($event) {
    this.sortDirection = $event.direction == '' ? undefined : $event;
    this.setPaginationParamDefault();
    this.choseRequest();
  }

  getUserRejectedQuizzes() {
    this.profileService.getRejectedQuizzes(this.rejectedPageSize, this.rejectedPageIndex, this.rejectedSortDirection).subscribe(
      resp => {
        this.rejectedQuizzes = resp.responceList;
        this.rejectedLength = resp.totalNumberOfElement;
      });
  }

  setPaginationRejectedParamDefault() {
    this.rejectedPageIndex = 0;
    this.rejectedPageSize = 8;
  }

  onPageRejectedChanged($event: PageEvent) {
    this.rejectedPageIndex = $event.pageIndex;
    this.rejectedPageSize = $event.pageSize;
    this.choseRejectedRequest();
  }

  choseRejectedRequest() {
      if (this.rejectedPageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.getUserRejectedQuizzes();
  }

  sortRejectedQuizzes($event) {
    this.rejectedSortDirection = $event.direction == '' ? undefined : $event;
    this.setPaginationRejectedParamDefault();
    this.choseRejectedRequest();
  }

  openDialog(id: number) {
    this.dialog.open(RejectMessagesDialogComponent, {
      data: id
    });
  }

  editQuiz(quiz: Quiz) {
    this.quizService.getQuizInfo(quiz.id).subscribe(
      resp => this.router.navigateByUrl('/new_quiz', {
        state: {
          quiz: resp
        }
      }),
      err => {
        console.log(err);
        alert(err.message);
      }
    );
  }

  onStartClick(id: string): void {
    this.router.navigate(['/game/settings', id]);
  }
}

import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../service/profileService/profile.service';
import {PageEvent} from "@angular/material/paginator";
import {Quiz} from "../../models/quiz";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";


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


  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.setPaginationParamDefault();
    this.getUserQuizzes();

    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(userSearch => {
        if (userSearch.length ==0) {
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
      resp=>{
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
    }else {
      this.getUserQuizzes();
    }
  }

  sortQuizzes($event) {
    this.sortDirection = $event.direction==''? undefined : $event;
    this.setPaginationParamDefault();
    this.choseRequest();
  }
}

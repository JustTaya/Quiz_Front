import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../models/quiz";
import {ProfileService} from "../../service/profileService/profile.service";
import {PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  constructor(private profileService: ProfileService) { }
  quizzes:Quiz[];
  public userRequest: string;
  userQuestionUpdate = new Subject<string>();

  length = 0;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [6, 12, 18];

  ngOnInit(): void {
    this.setPaginationParamDefault();
    this.uploadFavoriteQuizzes();

    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(userSearch => {
        if (userSearch.length == 0) {
          this.setPaginationParamDefault();
          this.uploadFavoriteQuizzes()
        } else {
          this.filterFavoriteQuizzes(userSearch);
        }
      });
  }

  uploadFavoriteQuizzes(){
    this.profileService.getFavoriteGames(this.pageSize, this.pageIndex).subscribe(
      resp=>{
        this.quizzes = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }

  setPaginationParamDefault() {
    this.pageIndex = 0;
    this.pageSize = 6;
  }

  onPageChanged($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.choseRequest();
  }

  filterFavoriteQuizzes(userSearch: string){
    this.profileService.filterFavoriteRequest(userSearch, this.pageSize, this.pageIndex).subscribe(
      resp=>{
        this.quizzes = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }


  choseRequest(){
    if (this.userRequest != undefined && this.userRequest) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.filterFavoriteQuizzes(this.userRequest);
    } else {
      this.uploadFavoriteQuizzes();
    }
  }

}

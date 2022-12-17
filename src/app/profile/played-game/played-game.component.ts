import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Subject} from "rxjs";
import {ProfileService} from "../../service/profileService/profile.service";
import {GameDto} from "../../models/game-dto";
import {MatDialog} from "@angular/material/dialog";
import {GameResultDialogComponent} from "./game-result-dialog/game-result-dialog.component";


@Component({
  selector: 'app-played-game',
  templateUrl: './played-game.component.html',
  styleUrls: ['./played-game.component.css']
})
export class PlayedGameComponent implements OnInit {
  playedGame: GameDto[];
  displayedColumns: string[] = ['name', 'date', 'score'];
  public userRequest: string;
  userQuestionUpdate = new Subject<string>();
  sortDirection = undefined;


  length = 0;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [9, 18, 27];

  constructor(private profileService: ProfileService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setPaginationParamDefault();

    this.uploadPlayedGames();

    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(userSearch => {
        if (userSearch.length == 0) {
          this.setPaginationParamDefault();
          this.uploadPlayedGames()
        } else {
          userSearch.length ==0 ? this.uploadPlayedGames() : this.uploadPlayedGames(userSearch);
        }
      });
  }

  setPaginationParamDefault() {
    this.pageIndex = 0;
    this.pageSize = 9;
  }

  uploadPlayedGames(userSearch?: string){
    this.profileService.getPlayedGames(this.pageSize, this.pageIndex, this.sortDirection, userSearch).subscribe(resp => {
      this.playedGame = resp.responceList;
      this.length = resp.totalNumberOfElement;
    });
  }

  onPageChanged($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.choseRequest();
  }

  choseRequest() {
    if (this.userRequest != undefined && this.userRequest) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.uploadPlayedGames(this.userRequest);
    }else {
      this.uploadPlayedGames();
    }
  }

  sortPlayedGames($event) {
    this.sortDirection = $event.direction==''? undefined : $event;
    this.setPaginationParamDefault();
    this.choseRequest();
  }

  openDialog(id: number) {
    this.dialog.open(GameResultDialogComponent, {
      data: id
    });
  }

}

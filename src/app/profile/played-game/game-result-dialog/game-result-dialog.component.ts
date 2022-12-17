import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayedGameComponent} from "../played-game.component";
import {ProfileService} from "../../../service/profileService/profile.service";
import {Player} from "../../../models/game.model";

@Component({
  selector: 'app-game-result-dialog',
  templateUrl: './game-result-dialog.component.html',
  styleUrls: ['./game-result-dialog.component.css']
})
export class GameResultDialogComponent implements OnInit {
  players: Player[];
  constructor(private profileService: ProfileService,
    public dialogRef: MatDialogRef<PlayedGameComponent>,
    @Inject(MAT_DIALOG_DATA) public gameId: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.profileService.getGamesResult(this.gameId).subscribe(
      resp =>
        this.players = resp
    );
  }


}

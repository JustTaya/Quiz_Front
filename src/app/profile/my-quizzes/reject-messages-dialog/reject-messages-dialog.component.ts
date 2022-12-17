import {Component, Inject, OnInit} from '@angular/core';
import {ProfileService} from "../../../service/profileService/profile.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayedGameComponent} from "../../played-game/played-game.component";
import {RejectMessage} from "../../../models/reject-message";

@Component({
  selector: 'app-reject-messages-dialog',
  templateUrl: './reject-messages-dialog.component.html',
  styleUrls: ['./reject-messages-dialog.component.css']
})
export class RejectMessagesDialogComponent implements OnInit {
  messages: RejectMessage[];
  constructor(private profileService: ProfileService,
              public dialogRef: MatDialogRef<PlayedGameComponent>,
              @Inject(MAT_DIALOG_DATA) public quizId: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.profileService.getRejectMessages(this.quizId).subscribe(
      resp =>{
        this.messages = resp;
      console.log(resp);}
    );
  }

}

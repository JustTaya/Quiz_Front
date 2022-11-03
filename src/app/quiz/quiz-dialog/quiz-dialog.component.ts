import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-quiz-dialog',
  templateUrl: './quiz-dialog.component.html',
  styleUrls: ['./quiz-dialog.component.css']
})
export class QuizDialogComponent {

  constructor(/*public dialogRef: MatDialogRef<QuizDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData*/) {
  }

/*  onNoClick(): void {
    this.dialogRef.close();
  }*/
}

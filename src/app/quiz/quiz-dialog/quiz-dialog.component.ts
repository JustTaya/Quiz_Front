import { AuthenticationService } from './../../service/loginService/authentication.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Quiz } from 'src/app/models/quiz';


export interface QuizDialogData {
  quizData: Quiz;
}

@Component({
  selector: 'app-quiz-dialog',
  templateUrl: './quiz-dialog.component.html',
  styleUrls: ['./quiz-dialog.component.css']
})
export class QuizDialogComponent implements OnInit {
  isLogin: boolean;

  constructor(public dialogRef: MatDialogRef<QuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuizDialogData,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLogin = this.authenticationService.logIn;
  }

  onStartClick(): void {
    this.router.navigate(['/game/settings', this.data.quizData.id]);
    this.dialogRef.close();
  }
}

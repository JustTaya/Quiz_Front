import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/pending-quizzes.model';
import {Router} from '@angular/router';
import {ShareIdService} from "../../service/profileService/share-id.service";
import {PlatformLocation} from "@angular/common";
import {CommentHistory} from "../../models/comment-history";
import {QuizCheckService} from "../../service/quizCheckService/quiz-check.service";

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.css']
})
export class QuizInfoComponent implements OnInit {
  public quiz: Quiz;
  currentQuizId: string;
  id: string;
  public comments: CommentHistory[];

  constructor(private quizService: QuizCheckService,
              private shareId: ShareIdService,
              private location: PlatformLocation,
              private router: Router){
    this.currentQuizId = JSON.parse(localStorage.getItem('currentQuiz')).id;
  }

  ngOnInit(): void {
    this.getQuiz(this.currentQuizId);
    this.getCommentHistory();
    this.location.onPopState(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['checkquiz', this.currentQuizId, {outlets: {quiznav: 'quizinfo'}}]);
      });
    });
  }
  public getCommentHistory(){
    this.quizService.getCommentHistory(this.currentQuizId).subscribe(
      (resp: any) => {
        this.comments = resp;
      },
      error => {
        console.log(error);
        alert('Something wrong with downloading comment history');
      }
    );
  }

  ngSubmit(){}

  public getQuiz(id: string){
    this.quizService.getQuizInfoById(id).subscribe(
      (resp: any) => {
        this.quiz = resp;
      },
      error => {
        console.log(error);
        alert('Something wrong with downloading quiz');
      }
    );
  }
  checkOut(id: number) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['profile', id, {outlets: {profilenav: 'profinfo'}}]);
    });
  }
}

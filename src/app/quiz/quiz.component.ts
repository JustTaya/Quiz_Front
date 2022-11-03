import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../models/quiz";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AuthenticationService} from "../service/loginService/authentication.service";
import {QuizService} from "../service/quizService/quiz.service";
import {CurrentUserService} from "../service/current-user.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input()
  quizData: Quiz;
  quizImage : SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,
              public authenticationService: AuthenticationService,
              private quizService: QuizService,
              private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.quizImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.quizData.image);
  }

  markQuizAsFavorite(): void{
    this.quizService.markQuizAsFavorite(this.quizData.id, (this.currentUserService.getCurrentUser().id)).subscribe(
      resp =>{
        this.quizData.favorite = true;
      }
    );
  }

  unmarkQuizAsFavorite(): void{
    this.quizService.unmarkQuizAsFavorite(this.quizData.id, (this.currentUserService.getCurrentUser().id)).subscribe(
      resp =>{
        this.quizData.favorite = false;
      }
    );
  }

}

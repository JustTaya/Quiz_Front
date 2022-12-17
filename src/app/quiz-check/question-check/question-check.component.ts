import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizCheckModel} from '../../models/quiz-check.model';
import {ModeratorComment} from "../../models/moderator-comment";
import {QuizCheckService} from "../../service/quizCheckService/quiz-check.service";
import {StatusType} from "../../models/status-type.enum";

@Component({
  selector: 'app-question-check',
  templateUrl: './question-check.component.html',
  styleUrls: ['./question-check.component.css']
})
export class QuestionCheckComponent implements OnInit {
  public modComment: ModeratorComment;
  public commentForm: FormGroup;
  private subscription: Subscription;
  quiz: QuizCheckModel;
  id: string;
  currentQuizId: number;
  currentUserId: number;
  checkedQuestions = [7];
  comment: string;
  submitted = false;
  labelPosition = 'before';

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizCheckService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getQuiz(JSON.parse(localStorage.getItem('currentQuiz')).id);
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  public getQuiz(id: string){
    this.quizService.getQuizById(id).subscribe(
      (resp: any) => {
        this.quiz = resp;
      },
      error => {
        console.log(error);
        alert('Something wrong with downloading quiz');
      }
    );
  }
  activeQuiz() {
    this.currentQuizId = JSON.parse(localStorage.getItem('currentQuiz')).id;
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.unsignModeratorQuiz();
    this.quizService.updateStatusQuiz(this.currentQuizId, StatusType.ACTIVE).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['profile', this.currentUserId, {outlets: {profilenav: 'pendingQuizzes'}}]);
        });
      },
      error => {
        alert('Something wrong while change active status');
      }
    );
  }
  checkCount(i: number) {
    if (!this.checkedQuestions.includes(i)){
      this.checkedQuestions.push(i);
    }
    else {
      this.checkedQuestions.splice(this.checkedQuestions.indexOf(i), i);
    }
  }
  allChecked(){
    if ( this.checkedQuestions.length - 1  === this.quiz.questions.length){
      return true;
    }
  }
  leaveComment() {
    this.currentQuizId = JSON.parse(localStorage.getItem('currentQuiz')).id;
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.unsignModeratorQuiz();
    const com = new ModeratorComment(this.currentQuizId, this.currentUserId, this.comment, new Date());
    this.quizService.addComment(com).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['profile', this.currentUserId, {outlets: {profilenav: 'pendingQuizzes'}}]);
          alert('Comment sent successfully');
        });
      },
      error => {
        alert('Something wrong while leave comment');
      }
    );
  }
  unsignModeratorQuiz() {
    this.quizService.unsignQuiz(this.currentQuizId).subscribe(
      (resp: any) => {
      },
    error => {
      alert('Something wrong while unsign');
    }
    );
  }
  get f() { return this.commentForm.controls; }


  public commentFormValidation(){
    this.submitted = true;

    if (this.commentForm.invalid) {
      return;
    }
    this.comment = this.commentForm.value.comment;
    this.leaveComment();
  }

}

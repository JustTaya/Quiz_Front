import { ImageService } from './../../service/imageService/image.service';
import { Observable, forkJoin } from 'rxjs';
import { NewQuizService } from './../../service/newQuizService/new-quiz.service';
import { QuestionComponent } from '../question/question.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Question, QuestionType } from '../../models/question.model';
import { Quiz } from '../../models/add-quiz.model';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  @ViewChildren(QuestionComponent) questionComponents!: QueryList<QuestionComponent>;

  quiz: Quiz;
  image: File;
  questions: Question[] = [];

  constructor(private router: Router,
    private newQuizService: NewQuizService,
    private imageService: ImageService) {
    this.quiz = this.router.getCurrentNavigation().extras.state.quiz;
    this.image = this.router.getCurrentNavigation().extras.state.image;
    this.questions = this.quiz.questions;
  }

  ngOnInit(): void {
  }

  addQuestion() {
    this.questions.push({
      id: null,
      quizId: null,
      type: "Option",
      text: '',
      active: true,
      answerList: null,
      image: null,
      changed: true,
      deleted: false
    });
  }

  removeQuestion(i: number) {
    if (this.questions.filter(item => !item.deleted).length > 1) {
      if (this.questions[i].id != null) {
        this.questions[i].deleted = true;
      } else {
        this.questions.splice(i, 1);
      }
    }
    else {
      alert("Can't delete the only one question");
    }
  }

  onSubmit() {
    const observableBatch: Observable<Question>[] = [];


    if (this.isValid()) {
      console.log("submit");
      this.questionComponents.toArray().forEach(el => {
        console.log(el.question);
        observableBatch.push(el.getData());
      });

      forkJoin(observableBatch).pipe(
        map(resp => this.quiz.questions = resp),
        mergeMap(
          _ => this.imageService.saveImage(this.image).pipe(
            map(resp => { if (resp != "") this.quiz.image = resp; }),
            mergeMap(_ => {
              console.log(this.quiz);
              return this.newQuizService.postQuiz(this.quiz);
            })
          )
        )
      ).subscribe(
        _ => this.router.navigateByUrl('/submitted_quiz'),
        err => {
          alert(err.message);
          console.log(err)
        }
      );
    }
    else {
      alert("Error. Check your questions");
    }
  }

  isValid(): boolean {
    let valid = true;

    this.questionComponents.toArray().forEach(
      value => {
        if (!value.isValid()) {
          valid = false;
        }
      }
    );

    return valid;
  }
}

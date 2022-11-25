import { forkJoin, Observable } from 'rxjs';
import { QuestionComponent } from './../question/question.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  @ViewChildren(QuestionComponent) questionComponents!: QueryList<QuestionComponent>;

  quizId: number;
  name: string;

  questions: Question[] = [];

  constructor(private router: Router) {
    let state = router.getCurrentNavigation().extras.state;
    this.quizId = state.id;
    this.name = state.name;
  }

  ngOnInit(): void {
    this.questions.push({
      id: null,
      quizId: this.quizId,
      type: 'OPTION',
      text: '',
      active: true,
      answerList: null
    });
  }

  addQuestion() {
    this.questions.push({
      id: null,
      quizId: this.quizId,
      type: 'OPTION',
      text: '',
      active: true,
      answerList: null
    });
  }

  removeQuestion(i: number) {
    if (this.questions.length > 1) {
      this.questions.splice(i, 1);
    }
    else {
      alert("Can't delete the only one question");
    }
  }

  onSubmit() {
    let isValid = true;

    this.questionComponents.toArray().forEach(
      value => {
        if (!value.isValid()) {
          isValid = false;
        }
      }
    );

    if (isValid) {
      let observableBatch: Observable<any>[] = [];

      console.log("submit")
      this.questionComponents.toArray().forEach(el => {
        el.quizId = this.quizId;
        observableBatch.push(el.save());
      })

      forkJoin(observableBatch).subscribe(
        () => {
          console.log('Quiz added');
          this.router.navigateByUrl('/submitted_quiz');
        },
        err => {
          alert(err);
        }
      );
    }
    else {
      alert("Error. Check your questions");
    }
  }
}

import { FormControl, Validators } from '@angular/forms';
import { GameAnswerComponent } from './../game-answer/game-answer.component';
import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-game-string-answer',
  templateUrl: './game-string-answer.component.html',
  styleUrls: ['./game-string-answer.component.css']
})
export class GameStringAnswerComponent extends GameAnswerComponent {
  stringAnswer: FormControl = new FormControl('', Validators.required);

  constructor() {
    super();
  }

  getSubmittedAnswers(): Answer[] {
    let answer = this.getEmptyAnswer();

    answer.text = this.stringAnswer.value;
    answer.questionId = this.questionId;

    return [answer];
  }
}

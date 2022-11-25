import { GameAnswerComponent } from './../game-answer/game-answer.component';
import { Component } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-game-boolean-answer',
  templateUrl: './game-boolean-answer.component.html',
  styleUrls: ['./game-boolean-answer.component.css']
})
export class GameBooleanAnswerComponent extends GameAnswerComponent {
  options: string[] = ["true", "false"];
  currentAnswer: string = null;

  constructor() {
    super();
  }

  onAnswerClick(option: string): void {
    this.currentAnswer = option;
  }

  getSubmittedAnswers(): Answer[] {
    let answer = this.getEmptyAnswer();
    answer.text = this.currentAnswer;
    answer.questionId = this.questionId;
    return [answer];
  }
}

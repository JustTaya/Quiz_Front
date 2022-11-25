import { GameAnswerComponent } from './../game-answer/game-answer.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-game-optional-answer',
  templateUrl: './game-optional-answer.component.html',
  styleUrls: ['./game-optional-answer.component.css']
})
export class GameOptionalAnswerComponent extends GameAnswerComponent implements OnInit {
  checked: boolean[] = [].fill(false, this.maxAnswerSize);

  constructor(private changeDetectionRef: ChangeDetectorRef) {
    super();
    this.changeDetectionRef.detach();
    setInterval(() => {
      this.changeDetectionRef.reattach();
      this.changeDetectionRef.markForCheck();
    }, 1000);
  }

  OnInit() {
  }

  getSubmittedAnswers(): Answer[] {
    let submittedAnswer: Answer[] = [];
    this.answers.forEach(
      (value, index) => {
        if (this.checked[index]) {
          submittedAnswer.push(value);
        }
      }
    );

    return submittedAnswer;
  }

}

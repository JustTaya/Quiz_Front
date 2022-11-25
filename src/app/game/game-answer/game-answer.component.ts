import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
@Component({
  selector: 'app-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.css']
})
export class GameAnswerComponent implements OnInit {
  maxAnswerSize: number = 4;
  @Input() answers: Answer[] = [];
  @Input() questionId: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  getSubmittedAnswers(): Answer[] {
    return [];
  }

  getEmptyAnswer(): Answer {
    return {
      id: null,
      questionId: null,
      text: null,
      correct: null,
      nextAnswerId: null
    };
  }
}

import { AnswerService } from './../service/answerService/answer.service';
import { AnswerComponent } from './../answer/answer.component';
import { Component, OnInit } from '@angular/core';
import { Answer } from '../models/answer.model';


@Component({
  selector: 'app-boolean-answer',
  templateUrl: './boolean-answer.component.html',
  styleUrls: ['./boolean-answer.component.css']
})
export class BooleanAnswerComponent extends AnswerComponent implements OnInit {
  checkBox: boolean = false;

  constructor(answerService: AnswerService) {
    super(answerService);
  }

  ngOnInit(): void {
    let result: Answer = {
      id: null,
      questionId: 0,
      text: "",
      correct: true,
      nextAnswerId: null
    };
    this.answer.push(result);
  }

  getData(): void {
    this.answer[0].questionId = this.questionId;
    this.answer[0].text = this.checkBox ? "true" : "false";
  }
}

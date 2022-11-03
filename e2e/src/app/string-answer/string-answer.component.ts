import { Validators } from '@angular/forms';
import { AnswerComponent } from './../answer/answer.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Answer } from '../models/answer.model';
import { AnswerService } from '../service/answerService/answer.service';

@Component({
  selector: 'app-string-answer',
  templateUrl: './string-answer.component.html',
  styleUrls: ['./string-answer.component.css']
})
export class StringAnswerComponent extends AnswerComponent implements OnInit {
  text: FormControl;

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

    this.text = new FormControl(
      this.answer[0].text, Validators.required
    );
  }

  isValid(): boolean {
    this.submitted = true;
    return this.text.valid;
  }

  getData(): void {
    this.answer[0].questionId = this.questionId;
    this.answer[0].text = this.text.value;
  }
}

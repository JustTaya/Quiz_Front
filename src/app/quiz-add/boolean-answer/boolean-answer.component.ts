import { ImageService } from './../../service/imageService/image.service';
import { AnswerService } from '../../service/answerService/answer.service';
import { AnswerComponent } from '../answer/answer.component';
import { Component, OnInit } from '@angular/core';
import { Answer } from '../../models/answer.model';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-boolean-answer',
  templateUrl: './boolean-answer.component.html',
  styleUrls: ['./boolean-answer.component.css']
})
export class BooleanAnswerComponent extends AnswerComponent implements OnInit {
  checkBox: boolean = false;

  constructor(imageService: ImageService) {
    super(imageService);
  }

  ngOnInit(): void {
    let result: Answer = {
      id: null,
      questionId: 0,
      text: "",
      correct: true,
      nextAnswerId: null,
      image: null,
      changed: true,
      deleted: false
    };
    this.answer.push(result);
  }

  getData(): Observable<Answer[]> {
    this.answer[0].questionId = this.questionId;
    this.answer[0].text = this.checkBox ? "true" : "false";

    return of(this.answer);
  }
}

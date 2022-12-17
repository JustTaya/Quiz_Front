import { ImageService } from './../../service/imageService/image.service';
import { Validators } from '@angular/forms';
import { AnswerComponent } from '../answer/answer.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Answer } from '../../models/answer.model';
import { AnswerService } from '../../service/answerService/answer.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-string-answer',
  templateUrl: './string-answer.component.html',
  styleUrls: ['./string-answer.component.css']
})
export class StringAnswerComponent extends AnswerComponent implements OnInit {
  text: FormControl;

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

    this.text = new FormControl(
      this.answer[0].text, Validators.required
    );
  }

  isValid(): boolean {
    this.submitted = true;
    return this.text.valid;
  }

  getData(): Observable<Answer[]> {
    if (this.answer[0].id != null && this.text.dirty) {
      this.answer[0].changed = true;
    }
    this.answer[0].text = this.text.value;

    return of(this.answer);
  }
}

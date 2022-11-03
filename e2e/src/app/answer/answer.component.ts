import { Observable, forkJoin } from 'rxjs';
import { Answer } from './../models/answer.model';
import { Component, OnInit } from '@angular/core';
import { ValidatorFn, ValidationErrors, FormArray } from '@angular/forms';
import { mergeMap, map, defaultIfEmpty } from 'rxjs/operators';
import { AnswerService } from '../service/answerService/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  submitted: boolean = false;

  answer: Answer[] = [];
  images: File[] = [];

  questionId: number;

  constructor(private answerService: AnswerService) { }

  ngOnInit() {
  }

  isValid(): boolean {
    return true;
  }

  save(): Observable<any> {
    this.submitted = true;
    this.getData();
    this.getImages();

    return this.saveAnswers().pipe(
      mergeMap(
        () => this.saveImages()
      ),
      defaultIfEmpty()
    );

  }

  saveAnswers(): Observable<any> {
    let observableBatch = [];

    this.answer.forEach(
      (item) => {
        if (item.text != null && item.text !== "") {
          observableBatch.push(
            this.answerService.postAnswer(item).pipe(map(response => item.id = response.id))
          );
        }
      }
    );

    return forkJoin(observableBatch);
  }

  saveImages(): Observable<any> {
    let observableBatch = [];

    this.answer.forEach(
      (item, index) => {
        if (item.text != null && item.text !== "" && this.images[index] != null) {
          observableBatch.push(
            this.answerService.updateImage(item.id, this.images[index])
          );
        }
      }
    );

    return forkJoin(observableBatch);
  }

  getData(): void {

  }

  getImages(): void {

  }

}

export function SequenceValidator(): ValidatorFn {
  return (formArray: FormArray): ValidationErrors => {
    for (var _i = 1; _i < formArray.controls.length; _i++) {
      let previous = formArray.controls[_i - 1];
      let current = formArray.controls[_i];

      if (current.get('text').value !== '' && previous.get('text').value === '') {
        previous.setErrors({ mustExist: true });
        return;
      } else {
        previous.setErrors(null);
      }
    }
    return;
  }
}
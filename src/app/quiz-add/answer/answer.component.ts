import { ImageService } from './../../service/imageService/image.service';
import { Answer } from '../../models/answer.model';
import { Component, OnInit, Input } from '@angular/core';
import { ValidatorFn, ValidationErrors, FormArray } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  submitted: boolean = false;

  @Input() answer: Answer[] = [];
  images: File[] = [];

  questionId: number;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  isValid(): boolean {
    return true;
  }

  getData(): Observable<Answer[]> {
    return null;
  }

  getImages(): void {

  }

  saveImages(): Observable<any> {
    let observableBatch = [];

    this.answer.forEach(
      (_, index) => {
        observableBatch.push(
          this.imageService.saveImage(this.images[index])
        );
      }
    );

    return forkJoin(observableBatch);
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
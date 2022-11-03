import { Observable, forkJoin } from 'rxjs';
import { AnswerService } from './../service/answerService/answer.service';
import { ImageUploadComponent } from './../image-upload/image-upload.component';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AnswerComponent, SequenceValidator } from './../answer/answer.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-sequence-answer',
  templateUrl: './sequence-answer.component.html',
  styleUrls: ['./sequence-answer.component.css']
})
export class SequenceAnswerComponent extends AnswerComponent implements OnInit {
  @ViewChildren(ImageUploadComponent) imageComponents!: QueryList<ImageUploadComponent>;

  answerForm: FormGroup;
  items: FormArray;

  maxAnswer = 4;
  minRequired = 2;

  service: AnswerService;

  constructor(private formBuilder: FormBuilder,
    answerService: AnswerService) {
    super(answerService);
    this.service = answerService;
  }

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      items: this.formBuilder.array([])
    });
    this.items = this.answerForm.get('items') as FormArray;
    for (var _i = 0; _i < this.maxAnswer; _i++) {
      this.answer.push({
        id: null,
        questionId: 0,
        text: "",
        correct: true,
        nextAnswerId: null
      });
      let formControl = new FormControl(this.answer[_i].text, []);
      if (_i < this.minRequired) {
        formControl.setValidators([Validators.required, Validators.maxLength(30)]);
      }
      this.items = this.answerForm.get('items') as FormArray;
      this.items.push(
        this.formBuilder.group({
          text: formControl
        })
      )
    }
    this.answerForm.get('items').setValidators([SequenceValidator()]);
  }

  isValid(): boolean {
    this.submitted = true;
    this.items.setValidators(SequenceValidator());
    return this.answerForm.valid;
  }

  save(): Observable<any> {
    this.submitted = true;
    this.getData();
    this.getImages();

    return this.saveAnswers().pipe(
      mergeMap(
        () =>
          this.updateAnswers()
      ),
      mergeMap(
        () =>
          this.saveImages()
      )
    );
  }

  getData(): void {
    for (var i = 0; i < this.answer.length; i++) {

      this.answer[i].text = (this.answerForm.get('items') as FormArray).at(i).get("text").value;

      if (this.answer[i].text === "" || this.answer[i].text == null)
        break;

      this.answer[i].questionId = this.questionId;
    }
  }

  getImages(): void {
    this.imageComponents.forEach(image => {
      if (image.selectedFile != null) {
        this.images.push(image.selectedFile.file);
      } else {
        this.images.push(null);
      }
    });
  }

  updateAnswers(): Observable<any> {
    let observableBatch = [];
    for (var i = 0; i < this.answer.length - 1; i++) {
      if (this.answer[i + 1].text == null || this.answer[i + 1].text === "") {
        break;
      }
      this.answer[i].nextAnswerId = this.answer[i + 1].id;
      observableBatch.push(this.service.updateAnswer(this.answer[i]));
    }
    return forkJoin(observableBatch);
  }
}

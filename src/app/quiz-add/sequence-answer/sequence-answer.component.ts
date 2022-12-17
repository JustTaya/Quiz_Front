import { ImageService } from './../../service/imageService/image.service';
import { Observable, of } from 'rxjs';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AnswerComponent, SequenceValidator } from '../answer/answer.component';
import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Answer } from 'src/app/models/answer.model';

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


  constructor(private formBuilder: FormBuilder,
    imageService: ImageService) {
    super(imageService);
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
        nextAnswerId: null,
        image: null,
        changed: true,
        deleted: false
      });
      const formControl = new FormControl(this.answer[_i].text, []);
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

  getData(): Observable<Answer[]> {
    this.getImages();
    for (var i = 0; i < this.answer.length; i++) {
      if (this.answer[i].id != null && (this.answerForm.get('items') as FormArray).at(i).dirty) {
        this.answer[i].changed = true;
      }

      const newText = (this.answerForm.get('items') as FormArray).at(i).get("text").value;

      if (this.answer[i].text != "" && newText == "") {
        this.answer[i].deleted = true;
      }

      this.answer[i].text = newText;

      if (this.answer[i].text === "" || this.answer[i].text == null)
        break;
    }

    return this.saveImages().pipe(
      map((resp) => {
        for (let i in resp) {
          if (resp[i] !== "") {
            this.answer[i].image = resp[i];
          }
        }
      }),
      mergeMap(_ => {
        const result = [];
        for (let i of this.answer) {
          if (i.text || i.deleted) {
            result.push(i);
          }
        }
        return of(result);
      })
    );
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
}

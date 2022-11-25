import { Validators } from '@angular/forms';
import { SequenceAnswerComponent } from './../sequence-answer/sequence-answer.component';
import { StringAnswerComponent } from './../string-answer/string-answer.component';
import { BooleanAnswerComponent } from './../boolean-answer/boolean-answer.component';
import { OptionalAnswerComponent } from './../optional-answer/optional-answer.component';
import { AnswerComponent } from './../answer/answer.component';
import { QuestionService } from './../service/questionService/question.service';
import { Question, QuestionType } from './../models/question.model';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef, ComponentFactory } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { map, mergeMap, defaultIfEmpty } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

interface QuestionTypeValue {
  value: string
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterViewInit {
  quizId: number;
  submitted: boolean = false;
  send: boolean = false;

  questionForm: FormGroup;
  questionTypes: QuestionTypeValue[] = [];
  componentRef: ComponentRef<AnswerComponent>

  question: Question = {
    id: null,
    quizId: null,
    type: QuestionType.OPTION,
    text: "",
    active: true,
    answerList: null
  };
  image: File = null;

  @ViewChild('dynamicComponent', { read: ViewContainerRef }) answerHost;
  @ViewChild(AnswerComponent) answerComponent: AnswerComponent;
  @ViewChild(ImageUploadComponent) imageComponent: ImageUploadComponent;

  constructor(public questionService: QuestionService,
    private formBuilder: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver) {
    Object.keys(QuestionType).forEach(
      value => this.questionTypes.push({ value })
    );
  }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      text: [this.question.text, [Validators.required, Validators.maxLength(360)]],
      type: [this.question.type]
    });
  }

  ngAfterViewInit(): void {
    this.loadComponent(QuestionType.OPTION.toString());
  }

  loadComponent(value: string) {
    let titleCasePipe = new TitleCasePipe();
    value = titleCasePipe.transform(value);
    var componentFactory: ComponentFactory<AnswerComponent>;
    switch (value) {
      case QuestionType.OPTION:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(OptionalAnswerComponent);
        break;
      case QuestionType.BOOLEAN:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(BooleanAnswerComponent);
        break;
      case QuestionType.ANSWER:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(StringAnswerComponent);
        break;
      case QuestionType.SEQUENCE:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(SequenceAnswerComponent);
        break;
    }

    this.answerHost.clear();
    this.componentRef = this.answerHost.createComponent(componentFactory);
    this.componentRef.changeDetectorRef.detectChanges();
  }

  isValid(): boolean {
    this.submitted = true;
    this.questionForm.markAsTouched();
    return this.questionForm.valid && this.componentRef.instance.isValid();
  }

  save(): Observable<any> {
    if (this.questionForm.invalid) {
      return;
    }

    this.submitted = true;
    let answer = this.componentRef.instance;
    if (answer.isValid()) {
      this.getData();

      return this.questionService.postQuestion(this.question).pipe(
        map(result => {
          this.question.id = result.id;
          answer.questionId = result.id;
          return this.question;
        }),
        mergeMap(
          question => {
            if (this.image != null) {
              return this.questionService.updateImage(question.id, this.image);
            }
            return of(null)
          }
        ),
        defaultIfEmpty(),
        mergeMap(() =>
          this.componentRef.instance.save()
        )
      );
    }
  }

  getData(): void {
    this.question.quizId = this.quizId;
    this.question.type = this.question.type.toUpperCase();
    this.question.text = this.questionForm.get('text').value;
    this.question.type = this.questionForm.get('type').value.value.toUpperCase();

    if (this.imageComponent.selectedFile != null)
      this.image = this.imageComponent.selectedFile.file;
  }

  onOptionSelected(value: QuestionTypeValue) {
    this.loadComponent(new TitleCasePipe().transform(value.value));
  }

}

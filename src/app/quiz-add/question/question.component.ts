import { ImageService } from './../../service/imageService/image.service';
import { Validators } from '@angular/forms';
import { SequenceAnswerComponent } from './../sequence-answer/sequence-answer.component';
import { StringAnswerComponent } from './../string-answer/string-answer.component';
import { BooleanAnswerComponent } from '../boolean-answer/boolean-answer.component';
import { OptionalAnswerComponent } from '../optional-answer/optional-answer.component';
import { AnswerComponent } from '../answer/answer.component';
import { QuestionService } from '../../service/questionService/question.service';
import { Question, QuestionType } from '../../models/question.model';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef, ComponentFactory, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { TitleCasePipe } from '@angular/common';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';

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
  questionTypes: string[] = [];
  componentRef: ComponentRef<AnswerComponent>

  @Input() question: Question = {
    id: null,
    quizId: null,
    type: "Option",
    text: "",
    active: true,
    answerList: [],
    image: null,
    changed: true,
    deleted: false
  };
  image: File = null;

  @ViewChild('dynamicComponent', { read: ViewContainerRef }) answerHost;
  @ViewChild(ImageUploadComponent) imageComponent: ImageUploadComponent;

  constructor(public questionService: QuestionService,
    private formBuilder: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private imageService: ImageService) {
    Object.keys(QuestionType).forEach(
      value => this.questionTypes.push(value)
    );
  }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      text: [this.question.text, [Validators.required, Validators.maxLength(360)]],
      type: [this.question.type]
    });
  }

  ngAfterViewInit(): void {
    this.questionForm.get('type').setValue(this.question.type);
    this.loadComponent(this.question.type);
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
    if (this.question.id) {
      if (value === QuestionType.OPTION || value === QuestionType.SEQUENCE) {
        while (this.question.answerList.length < 4) {
          this.question.answerList.push({
            id: null,
            questionId: 0,
            text: "",
            correct: false,
            nextAnswerId: null,
            image: null,
            changed: true,
            deleted: true
          });
        }
      }
      this.componentRef.instance.answer = this.question.answerList;
    }
    this.componentRef.changeDetectorRef.detectChanges();
  }

  isValid(): boolean {
    this.submitted = true;
    this.questionForm.markAsTouched();
    return this.questionForm.valid && this.componentRef.instance.isValid();
  }

  getData(): Observable<Question> {
    this.question.quizId = this.quizId;
    this.question.type = this.question.type.toUpperCase();
    this.question.text = this.questionForm.get('text').value;
    this.question.type = this.questionForm.get('type').value.toUpperCase();
    this.question.answerList = this.componentRef.instance.answer;

    return this.componentRef.instance.getData().pipe(
      map(resp => { console.log(resp); this.question.answerList = resp; }),
      mergeMap(_ => this.imageService.saveImage(this.imageComponent.selectedFile?.file).pipe(
        map(resp => { if (resp != "") this.question.image = resp; }),
        mergeMap(_ => of(this.question))
      ))
    );
  }

  onOptionSelected(value: string) {
    console.log(value);
    this.loadComponent(value);
  }

}

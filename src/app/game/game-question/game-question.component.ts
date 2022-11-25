import { Player } from './../../models/game.model';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './../../service/gameService/game.service';
import { GameStringAnswerComponent } from './../game-string-answer/game-string-answer.component';
import { GameBooleanAnswerComponent } from './../game-boolean-answer/game-boolean-answer.component';
import { GameOptionalAnswerComponent } from './../game-optional-answer/game-optional-answer.component';
import { GameAnswerComponent } from './../game-answer/game-answer.component';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, AfterViewInit } from '@angular/core';
import { Question, QuestionType } from 'src/app/models/question.model';
import { GameSequenceAnswerComponent } from '../game-sequence-answer/game-sequence-answer.component';
import { Answer } from 'src/app/models/answer.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.css']
})
export class GameQuestionComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) answerHost;

  gameId: number;

  initTime: number;
  questionTimer: number;

  question: Question;
  questionNumber: number;
  player: Player; //FIXME: set user
  answers: Answer[];

  image: string = null;

  componentRef: ComponentRef<GameAnswerComponent>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.params['gameId'];

    this.player = history.state.player;
    this.questionNumber = history.state.questionNumber + 1;
    this.question = history.state.question;
    this.initTime = history.state.questionTimer;
    this.questionTimer = this.initTime;
  }

  ngAfterViewInit(): void {
    this.loadComponent(this.question.type);
    this.startTimer();
  }

  loadComponent(value: string) {
    let titleCasePipe = new TitleCasePipe();
    value = titleCasePipe.transform(value);
    var componentFactory: ComponentFactory<GameAnswerComponent>;
    switch (value) {
      case QuestionType.OPTION:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(GameOptionalAnswerComponent);
        break;
      case QuestionType.BOOLEAN:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(GameBooleanAnswerComponent);
        break;
      case QuestionType.ANSWER:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(GameStringAnswerComponent);
        break;
      case QuestionType.SEQUENCE:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(GameSequenceAnswerComponent);
        break;
    }

    this.answerHost.clear();
    this.componentRef = this.answerHost.createComponent(componentFactory);

    this.componentRef.instance.answers = this.question.answerList;
    this.componentRef.instance.questionId = this.question.id;

    this.componentRef.changeDetectorRef.detectChanges();

  }

  interval: NodeJS.Timeout;

  startTimer() {
    this.questionTimer = this.initTime;

    this.interval = setInterval(() => {
      if (this.questionTimer > 0) {
        this.questionTimer--
      } else {
        clearInterval(this.interval);
        this.submitAnswer();
      }
    }, 1000);
  }

  submitAnswer() {
    let answers = this.componentRef.instance.getSubmittedAnswers();
    this.gameService.postAnswer(answers);
  }
}

import { Player } from './../../models/game.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GameService } from './../../service/gameService/game.service';
import { GameStringAnswerComponent } from './../game-string-answer/game-string-answer.component';
import { GameBooleanAnswerComponent } from './../game-boolean-answer/game-boolean-answer.component';
import { GameOptionalAnswerComponent } from './../game-optional-answer/game-optional-answer.component';
import { GameAnswerComponent } from './../game-answer/game-answer.component';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, AfterViewInit, EventEmitter, HostListener, AfterViewChecked } from '@angular/core';
import { Question, QuestionType } from 'src/app/models/question.model';
import { GameSequenceAnswerComponent } from '../game-sequence-answer/game-sequence-answer.component';
import { Answer } from 'src/app/models/answer.model';
import { TitleCasePipe } from '@angular/common';
import { CanComponentDeactivate } from 'src/app/service/canDeactivateGuardService/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.css']
})
export class GameQuestionComponent implements OnInit, AfterViewChecked, CanComponentDeactivate {
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

  navigationSubscription: any;
  initialized: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private gameService: GameService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialized = false;
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.params['gameId'];

    this.player = history.state.player;
    this.questionNumber = history.state.questionNumber + 1;
    this.question = history.state.question;
    this.initTime = history.state.questionTimer;
    this.questionTimer = this.initTime;

  }

  ngAfterViewChecked(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.loadComponent();
      this.startTimer();
    }
  }

  loadComponent() {
    while (!this.answerHost) { }
    let titleCasePipe = new TitleCasePipe();
    var componentFactory: ComponentFactory<GameAnswerComponent>;
    switch (titleCasePipe.transform(this.question.type)) {
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

    for (let answer of answers) {
      answer.questionId = this.question.id;
    }

    this.gameService.postAnswer(answers);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (window.confirm('Quit this page?')) {
      this.gameService.disconnect();
      return true;
    }
    return false;
  }
}

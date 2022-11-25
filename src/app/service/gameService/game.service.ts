import { GameStateService } from './../gameStateService/game-state.service';
import { Router } from '@angular/router';
import { Player } from './../../models/game.model';
import * as SockJs from 'sockjs-client';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Observable, ReplaySubject, of } from 'rxjs';
import { Answer } from 'src/app/models/answer.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  BASE_URL: string = window["configureApiBaseUrl"];
  CREATE_GAME: string = `${this.BASE_URL}\\play\\addSession`;
  webSocketEndPoint: string = `${this.BASE_URL}\\ws`;
  client: RxStomp;

  gameObservable: Observable<string>;
  gameId: number;
  player: Player;

  constructor(private http: HttpClient, private router: Router, private gameStateService: GameStateService) { }

  createGame(game: Game): Observable<number> {
    return this.http.post<number>(this.CREATE_GAME, game);
  }

  initializeWebSocketConnection(gameId: number, player: Player) {
    this.gameId = gameId;
    this.player = player;

    let that = this;

    let config = new RxStompConfig();
    config.webSocketFactory = function () { return new SockJs(that.webSocketEndPoint); };

    this.client = new RxStomp();
    this.client.configure(config);

    this.gameStateService.setGameState(this.gameId, false);

    this.gameObservable = this.client.watch(`/play/game/${this.gameId}`).pipe(
      map(resp => resp.body)
    );
  }

  connect(): void {
    this.client.activate();
    this.client.publish({ destination: `/app/play/game/${this.gameId}/user`, body: JSON.stringify(this.player) });
  }

  waitGameStart(): Observable<string> {
    return this.gameObservable;
  }

  subscribeQuestion() {
    this.gameObservable.subscribe(
      resp => {
        let data = JSON.parse(resp);
        if (data) {
          if (data['question']) {
            this.gameStateService.setGameState(this.gameId, true);
            this.routeQuestion(data);
          }
          else {
            if (this.gameStateService.getGameState(this.gameId)) {
              this.routeResults();
            }
          }
        }
      }
    );
  }

  subscribeRating(): Observable<Player[]> {
    return this.gameObservable.pipe(
      map(resp => {
        let data = JSON.parse(resp);
        return data['players'];
      })
    );
  }

  startGame() {
    this.client.publish({ destination: `/app/play/game/${this.gameId}/start` });
  }

  postAnswer(answers: Answer[]) {
    this.client.publish({ destination: `/app/play/game/${this.gameId}/sendAnswer`, body: JSON.stringify({ answers: answers, player: this.player }) });
  }

  getQuestion(): Observable<string> {
    return this.gameObservable;
  }

  routeQuestion(data: any) {
    let link = `/game/question/${this.gameId}`;
    this.router.navigate([link],
      {
        state: {
          questionNumber: data['questionNumber'],
          question: data['question'],
          questionTimer: data['questionTimer'],
          player: this.player
        }
      });
  }

  routeResults() {
    let link = `/game/finish/${this.gameId}`;
    this.router.navigate([link]);
  }

  finishGame() {
    this.client.publish({ destination: `/app/play/game/${this.gameId}/finish` });
  }

  manageGameState() {
    if (!this.gameStateService.getGameState(this.gameId)) {
      this.gameStateService.setGameState(this.gameId, true);
    }
  }

  disconnect() {
    this.gameStateService.deleteGame(this.gameId);
    this.client.deactivate();
  }
}

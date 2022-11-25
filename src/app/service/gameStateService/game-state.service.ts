import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor() { }

  setGameState(gameId: number, active: boolean) {
    sessionStorage.setItem(gameId.toString(), String(active));
  }

  getGameState(gameId: number): boolean {
    return JSON.parse(sessionStorage.getItem(gameId.toString()));
  }

  deleteGame(gameId: number) {
    sessionStorage.removeItem(gameId.toString());
  }
}

import { Router } from '@angular/router';
import { GameService } from './../../service/gameService/game.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-finish',
  templateUrl: './game-finish.component.html',
  styleUrls: ['./game-finish.component.css']
})
export class GameFinishComponent implements OnInit {
  gameId: number;

  rating: Observable<Player[]>;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRating();
  }

  getRating() {
    this.rating = this.gameService.subscribeRating();
    this.gameService.finishGame();
  }

  quitGame() {
    this.router.navigateByUrl('dashboard');
  }

}

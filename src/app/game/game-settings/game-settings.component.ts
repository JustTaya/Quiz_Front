import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { mergeMap, defaultIfEmpty } from 'rxjs/operators';
import { GameService } from './../../service/gameService/game.service';
import { CurrentUserService } from './../../service/current-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from './../../models/game.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {
  gameSettingsForm = new FormGroup({
    maxUserNumberControl: new FormControl("10", [Validators.min(2), Validators.max(50)]),
    questionTimerControl: new FormControl("10", [Validators.min(5), Validators.max(50)])
  });

  game: Game = {
    id: null,
    quizId: null,
    hostId: null,
    questionTimer: 10,
    maxUsersNumber: 10,
    players: null
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,
    private gameService: GameService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.game.quizId = +params['quizId'];
    });
    this.game.hostId = parseInt(this.currentUserService.getCurrentUser().id);
  }

  createGame(): void {
    if (this.gameSettingsForm.valid) {
      this.game.maxUsersNumber = this.gameSettingsForm.get('maxUserNumberControl').value;
      this.game.questionTimer = this.gameSettingsForm.get('questionTimerControl').value;

      this.gameService.createGame(this.game).subscribe(
        response => this.router.navigate(['/game/start', response]),

        err => {
          console.log("Error creating game: " + err)
        }  //FIXME: handle errors
      )
    }
  }


}

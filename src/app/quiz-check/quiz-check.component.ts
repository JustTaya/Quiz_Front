import { Component, OnInit } from '@angular/core';
import {Quiz} from '../models/pending-quizzes.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../service/quizService/quiz.service';
import {Subscription} from 'rxjs';
import {ShareIdService} from '../service/profileService/share-id.service';

@Component({
  selector: 'app-quiz-check',
  templateUrl: './quiz-check.component.html',
  styleUrls: ['./quiz-check.component.css']
})
export class QuizCheckComponent implements OnInit {
  private subscription: Subscription;
  id: string;
  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private shareId: ShareIdService) {
    this.subscription = this.activateRoute.params.subscribe(
      params => {
        this.id = params.id;
      }
    );
  }

  ngOnInit(): void {
  }
}

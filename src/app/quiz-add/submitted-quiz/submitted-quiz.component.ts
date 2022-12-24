import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../../service/current-user.service";

@Component({
  selector: 'app-submitted-quiz',
  templateUrl: './submitted-quiz.component.html',
  styleUrls: ['./submitted-quiz.component.css']
})
export class SubmittedQuizComponent implements OnInit {

  constructor(private router: Router,
              private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
  }

  goToProfile() {
    this.router.navigate(['profile', this.currentUserService.getCurrentUser().id, {outlets: {profilenav: 'profinfo'}}]);
  }

}

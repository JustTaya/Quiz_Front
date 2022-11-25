import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/loginService/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUser: any;
  username: string;
  id: string;

  constructor(public authService: AuthenticationService,
    private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      this.username = this.currentUser.email;
      this.id = this.currentUser.id;
    }
  }

  ngOnInit(): void { }

  toProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile', this.id, { outlets: { profilenav: 'profinfo' } }]);
    });
  }

  toGame(gameId: number) {
    this.router.navigateByUrl(`/game/start/${gameId}`);
  }

}

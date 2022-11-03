import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ShareIdService} from "../service/profileService/share-id.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    this.shareId.setId(this.id);
    this.router.navigate([{outlets: {profilenav: 'profinfo'}}]);
  }

  ngOnInit(): void {
  }
}

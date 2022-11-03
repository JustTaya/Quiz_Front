import { Component, OnInit } from '@angular/core';
import {ShareIdService} from "../../service/profileService/share-id.service";

@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.css']
})
export class ProfileNavigationComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  id:any;

  navLinks: any = [
    {
      label: 'My Profile',
      link:'[{outlets: {profilenav: \'profinfo\'}}]',
      index: 0
    },
    {
      label: 'My friends',
      link: '[{outlets: {profilenav: \'profinfo\'}}]',
      index: 1
    },
    {
      label: 'My Quizzes',
      link: '[{outlets: {profilenav: \'profinfo\'}}]',
      index: 2
    },
    {
      label: 'Favorite',
      link: [{outlets: {profilenav: 'profinfo'}}],
      index: 3
    }
  ];
  constructor(private shareId: ShareIdService) {
  }

  ngOnInit(): void {
    this.id = this.shareId.shareId();
  }

}

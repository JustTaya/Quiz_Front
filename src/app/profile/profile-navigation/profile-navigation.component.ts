import { Component, OnInit } from '@angular/core';
import {ShareIdService} from "../../service/profileService/share-id.service";
import {Role} from '../../models/role.enum';


@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.css']
})
export class ProfileNavigationComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  roleUs: Role;
  public isAdmin = false;
  id: any;

  constructor(private shareId: ShareIdService) {
    this.id = shareId.shareId();
    this.roleUs = JSON.parse(localStorage.getItem('currentUser')).role;
  }
  adminCheck(){
    if (this.roleUs.toString() !== Role[Role.USER]){
      this.isAdmin = true;
    }
  }
  ngOnInit(): void {
    this.id = this.shareId.shareId();
    this.adminCheck();
  }

}

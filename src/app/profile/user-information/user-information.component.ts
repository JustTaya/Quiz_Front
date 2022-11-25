import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { ProfileService } from "../../service/profileService/profile.service";
import { ShareIdService } from "../../service/profileService/share-id.service";
import { PlatformLocation } from "@angular/common";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  floatLabelControl = new FormControl('auto');
  public profile: User;
  public isEditForm = false;
  currentUserId: string;
  id: string;

  constructor(private profileService: ProfileService,
    private shareId: ShareIdService,
    private location: PlatformLocation,
    private router: Router) {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.id = shareId.shareId();
    this.shareId.setEmail(JSON.parse(localStorage.getItem('currentUser')).email);
  }

  ngOnInit(): void {
    this.getProfile(this.id);
    this.location.onPopState(() => {
      this.shareId.setId(this.currentUserId);
      this.shareId.setEmail(JSON.parse(localStorage.getItem('currentUser')).email);

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profile', this.currentUserId, { outlets: { profilenav: 'profinfo' } }]);
      });
    });
  }

  closeEditForm() {
    this.isEditForm = false;
  }

  ngSubmit() {
    this.saveProfile();
    this.closeEditForm();
  }

  public getProfile(id: string) {
    this.profileService.getProfile(id).subscribe(
      (resp: any) => {
        this.profile = resp;
      },
      error => {
        console.log(error);
        alert("Something wrong with downloading profile");
      }
    );
  }

  saveProfile() {
    this.profileService.updateProfile(this.profile).subscribe(
      (resp: any) => {
        this.profile = resp;
      },
      error => {
        alert("Something wrong while updating profile");
      }
    );
  }
}



import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profileService/profile.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NotificationStatus} from "../../models/notification-status.enum";
import {ShareIdService} from "../../service/profileService/share-id.service";

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {
  username = JSON.parse(localStorage.getItem('currentUser')).email;
  currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
  notificationStatus: NotificationStatus;
  progressImage: any;
  imageUrl: string;
  id: string;
  constructor(private profileService: ProfileService,
              private sanitizer: DomSanitizer,
              private shareId: ShareIdService) {
    this.id = shareId.shareId();

    if (shareId.shareEmail() != undefined){
      this.username = shareId.shareEmail();
    }
  }

  ngOnInit(): void {
    this.uploadFile();
    this.getNotification();
  }

  fileProgress(imageInput: any){
    this.progressImage = <File>imageInput.target.files[0];
    this.changeImg();
  }

  changeImg() {
    this.profileService.updateImage(this.progressImage).subscribe(
      resp => {
        this.uploadFile();
        alert("Icon was changed")
      },
      error => {
        alert("Error while updating icon")
      }
    )
  }

  uploadFile(){
    this.profileService.getProfileImage(this.id).subscribe(
      resp => {
        this.imageUrl = resp.text;
      },
      error => {
        console.log(error);
      }
    );
  }

  change(){
    this.profileService.updateNotificationStatus(this.notificationStatus).subscribe(
      resp =>{
        alert("Notification status was changed")
      },
      error => {
        alert("Error while change notification status")
      }
    );
  }

  getNotification() {
    this.profileService.getUserNotificationStatus().subscribe(
      resp =>{
        this.notificationStatus = resp;
      }
    );
  }
}

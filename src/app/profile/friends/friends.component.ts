import {ProfileService} from '../../service/profileService/profile.service';
import {ShareIdService} from '../../service/profileService/share-id.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../../models/user";
import {PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";



@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: User[];
  displayedColumns: string[] = ['name', 'rating', 'actions'];
  public userRequest: string;
  userQuestionUpdate = new Subject<string>();
  sortDirection = undefined;


  length = 0;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [9, 18, 27];

  constructor(private profileService: ProfileService,
              private router: Router,
              private shareId: ShareIdService) {

  }

  ngOnInit(): void {
    this.setPaginationParamDefault();

    this.uploadFriends();

    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(userSearch => {
        if (userSearch.length == 0) {
          this.setPaginationParamDefault();
          this.uploadFriends()
        } else {
          this.filterFriends(userSearch);
        }
      });
  }

  checkOut(id: string, email: string) {
    this.shareId.setEmail(email);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['profile', id, {outlets: {profilenav: 'profinfo'}}]);
    });
  }

  setPaginationParamDefault() {
    this.pageIndex = 0;
    this.pageSize = 9;
  }

  uploadFriends(){
    this.profileService.getFriends(this.pageSize, this.pageIndex, this.sortDirection).subscribe(resp => {
      this.friends = resp.responceList;
      this.length = resp.totalNumberOfElement;
    });
  }

  onPageChanged($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.choseRequest();
  }

  filterFriends(userSearch: string) {
    this.profileService.filterFriendsRequest(userSearch, this.pageSize, this.pageIndex, this.sortDirection).subscribe(
      resp => {
        this.friends = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }

  sortFriends($event) {
    this.sortDirection = $event.direction==''? undefined : $event;
    this.setPaginationParamDefault();
    this.choseRequest();
  }

  choseRequest(){
    if (this.userRequest != undefined && this.userRequest) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.filterFriends(this.userRequest);
    } else {
      this.uploadFriends();
    }
  }
}



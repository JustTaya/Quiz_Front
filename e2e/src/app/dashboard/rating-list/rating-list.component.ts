import { Observable } from 'rxjs';
import { RatingService } from './../../service/ratingService/rating.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  @Input('userId') userId: number;
  @Input('ratingPos') ratingPos: Observable<number>;

  topNumber: number = 3;
  range: number = 2;
  topUsers: Observable<User[]>
  nearUsers: Observable<User[]>;
  displayedColumns: string[] = ['position', 'name', 'surname', 'rating'];


  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.topUsers = this.ratingService.getRating(0, this.topNumber);
    this.nearUsers = this.ratingService.getRatingRange(this.userId, this.range);
  }

}

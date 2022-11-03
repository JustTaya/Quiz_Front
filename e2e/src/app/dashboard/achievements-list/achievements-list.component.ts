import { Achievement } from './../../models/achievement.model';
import { AchievementsService } from '../../service/achievementsService/achievements.service';
import { Category } from './../../models/category.model';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-achievements-list',
  templateUrl: './achievements-list.component.html',
  styleUrls: ['./achievements-list.component.css']
})
export class AchievementsListComponent implements OnInit {
  @Input('userId') userId: number;

  categories: Observable<Category[]>;
  achievements: Observable<Achievement[]>;

  constructor(private achievementsService: AchievementsService) { }

  ngOnInit(): void {
    this.categories = this.achievementsService.getAchievementCategories();
    this.achievements = this.achievementsService.getAchievementsByUser(this.userId);
  }
}

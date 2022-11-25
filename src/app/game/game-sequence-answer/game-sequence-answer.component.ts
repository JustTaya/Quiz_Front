import { GameAnswerComponent } from './../game-answer/game-answer.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-game-sequence-answer',
  templateUrl: './game-sequence-answer.component.html',
  styleUrls: ['./game-sequence-answer.component.css']
})
export class GameSequenceAnswerComponent extends GameAnswerComponent implements OnInit {
  constructor(private changeDetectionRef: ChangeDetectorRef) {
    super();
    this.changeDetectionRef.detach();
    setInterval(() => {
      this.changeDetectionRef.reattach();
      this.changeDetectionRef.markForCheck();
    }, 1000);
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.answers, event.previousIndex, event.currentIndex);
  }

  getSubmittedAnswers(): Answer[] {
    return this.answers;
  }
}

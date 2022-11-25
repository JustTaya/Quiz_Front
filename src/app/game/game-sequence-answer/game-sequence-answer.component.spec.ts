import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSequenceAnswerComponent } from './game-sequence-answer.component';

describe('GameSequenceAnswerComponent', () => {
  let component: GameSequenceAnswerComponent;
  let fixture: ComponentFixture<GameSequenceAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSequenceAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSequenceAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

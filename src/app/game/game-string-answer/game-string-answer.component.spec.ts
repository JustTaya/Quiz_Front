import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStringAnswerComponent } from './game-string-answer.component';

describe('GameStringAnswerComponent', () => {
  let component: GameStringAnswerComponent;
  let fixture: ComponentFixture<GameStringAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStringAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStringAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

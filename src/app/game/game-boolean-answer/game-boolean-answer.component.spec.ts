import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBooleanAnswerComponent } from './game-boolean-answer.component';

describe('GameBooleanAnswerComponent', () => {
  let component: GameBooleanAnswerComponent;
  let fixture: ComponentFixture<GameBooleanAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBooleanAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBooleanAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

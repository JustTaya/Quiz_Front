import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOptionalAnswerComponent } from './game-optional-answer.component';

describe('GameOptionalAnswerComponent', () => {
  let component: GameOptionalAnswerComponent;
  let fixture: ComponentFixture<GameOptionalAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOptionalAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOptionalAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

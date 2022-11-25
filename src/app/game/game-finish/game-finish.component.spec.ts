import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFinishComponent } from './game-finish.component';

describe('GameFinishComponent', () => {
  let component: GameFinishComponent;
  let fixture: ComponentFixture<GameFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

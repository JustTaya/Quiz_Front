import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedGameComponent } from './played-game.component';

describe('PlayedGameComponent', () => {
  let component: PlayedGameComponent;
  let fixture: ComponentFixture<PlayedGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayedGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

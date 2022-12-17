import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingQuizzesComponent } from './pending-quizzes.component';

describe('NotCheckedQuizzesComponent', () => {
  let component: PendingQuizzesComponent;
  let fixture: ComponentFixture<PendingQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

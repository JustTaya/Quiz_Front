import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCheckComponent } from './quiz-check.component';

describe('QuizCheckComponent', () => {
  let component: QuizCheckComponent;
  let fixture: ComponentFixture<QuizCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

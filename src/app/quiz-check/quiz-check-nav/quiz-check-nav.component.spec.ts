import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCheckNavComponent } from './quiz-check-nav.component';

describe('QuizCheckNavComponent', () => {
  let component: QuizCheckNavComponent;
  let fixture: ComponentFixture<QuizCheckNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCheckNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCheckNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

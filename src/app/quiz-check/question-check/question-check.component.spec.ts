import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCheckComponent } from './question-check.component';

describe('QuestionCheckComponent', () => {
  let component: QuestionCheckComponent;
  let fixture: ComponentFixture<QuestionCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

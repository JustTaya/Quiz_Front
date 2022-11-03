import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalAnswerComponent } from './optional-answer.component';

describe('OptionalAnswerComponent', () => {
  let component: OptionalAnswerComponent;
  let fixture: ComponentFixture<OptionalAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

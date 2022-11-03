import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringAnswerComponent } from './string-answer.component';

describe('StringAnswerComponent', () => {
  let component: StringAnswerComponent;
  let fixture: ComponentFixture<StringAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

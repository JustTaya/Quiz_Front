import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanAnswerComponent } from './boolean-answer.component';

describe('BooleanAnswerComponent', () => {
  let component: BooleanAnswerComponent;
  let fixture: ComponentFixture<BooleanAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

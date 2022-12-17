import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectMessagesDialogComponent } from './reject-messages-dialog.component';

describe('RejectMessagesDialogComponent', () => {
  let component: RejectMessagesDialogComponent;
  let fixture: ComponentFixture<RejectMessagesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectMessagesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectMessagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

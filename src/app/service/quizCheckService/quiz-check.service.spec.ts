import { TestBed } from '@angular/core/testing';

import { QuizCheckService } from './quiz-check.service';

describe('QuizCheckService', () => {
  let service: QuizCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

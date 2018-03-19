import { TestBed, inject } from '@angular/core/testing';

import { ReviewquestionService } from './reviewquestion.service';

describe('ReviewquestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewquestionService]
    });
  });

  it('should be created', inject([ReviewquestionService], (service: ReviewquestionService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { OppoFilterAllTeamService } from './oppo-filter-all-team.service';

describe('OppoFilterAllTeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OppoFilterAllTeamService]
    });
  });

  it('should be created', inject([OppoFilterAllTeamService], (service: OppoFilterAllTeamService) => {
    expect(service).toBeTruthy();
  }));
});

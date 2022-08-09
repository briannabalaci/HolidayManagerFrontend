import { TestBed } from '@angular/core/testing';

import { TeamleadService } from './teamlead.service';

describe('TeamleadService', () => {
  let service: TeamleadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamleadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

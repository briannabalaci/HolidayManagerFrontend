import { TestBed } from '@angular/core/testing';

import { AuthguardTeamleadService } from './authguard-teamlead.service';

describe('AuthguardTeamleadService', () => {
  let service: AuthguardTeamleadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthguardTeamleadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

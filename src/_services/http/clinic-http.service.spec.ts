import { TestBed } from '@angular/core/testing';

import { ClinicHttpService } from './clinic-http.service';

describe('ClinicHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicHttpService = TestBed.get(ClinicHttpService);
    expect(service).toBeTruthy();
  });
});

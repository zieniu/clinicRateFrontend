import { TestBed } from '@angular/core/testing';

import { DictProvinceHttpService } from './dict-province-http.service';

describe('DictProvinceHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DictProvinceHttpService = TestBed.get(DictProvinceHttpService);
    expect(service).toBeTruthy();
  });
});

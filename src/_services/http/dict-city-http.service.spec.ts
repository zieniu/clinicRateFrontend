import { TestBed } from '@angular/core/testing';

import { DictCityHttpService } from './dict-city-http.service';

describe('DictCityHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DictCityHttpService = TestBed.get(DictCityHttpService);
    expect(service).toBeTruthy();
  });
});

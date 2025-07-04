import { TestBed } from '@angular/core/testing';

import { MockoonService } from './mockoon.service';

describe('MockoonService', () => {
  let service: MockoonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockoonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

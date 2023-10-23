import { TestBed } from '@angular/core/testing';

import { SpendingRecordsService } from './spending-records.service';

describe('SpendingRecordsService', () => {
  let service: SpendingRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendingRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

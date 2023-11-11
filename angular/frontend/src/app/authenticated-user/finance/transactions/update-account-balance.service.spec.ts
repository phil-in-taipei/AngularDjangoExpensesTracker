import { TestBed } from '@angular/core/testing';

import { UpdateAccountBalanceService } from './update-account-balance.service';

describe('UpdateAccountBalanceService', () => {
  let service: UpdateAccountBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAccountBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWithdrawalNewBalanceComponent } from './delete-withdrawal-new-balance.component';

describe('DeleteWithdrawalNewBalanceComponent', () => {
  let component: DeleteWithdrawalNewBalanceComponent;
  let fixture: ComponentFixture<DeleteWithdrawalNewBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWithdrawalNewBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWithdrawalNewBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

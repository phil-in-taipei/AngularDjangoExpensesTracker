import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWithdrawalNewBalanceComponent } from './create-withdrawal-new-balance.component';

describe('CreateWithdrawalNewBalanceComponent', () => {
  let component: CreateWithdrawalNewBalanceComponent;
  let fixture: ComponentFixture<CreateWithdrawalNewBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWithdrawalNewBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWithdrawalNewBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

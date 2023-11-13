import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepositNewBalanceComponent } from './create-deposit-new-balance.component';

describe('CreateDepositNewBalanceComponent', () => {
  let component: CreateDepositNewBalanceComponent;
  let fixture: ComponentFixture<CreateDepositNewBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDepositNewBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepositNewBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

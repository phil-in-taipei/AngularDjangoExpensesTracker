import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepositNewBalanceComponent } from './delete-deposit-new-balance.component';

describe('DeleteDepositNewBalanceComponent', () => {
  let component: DeleteDepositNewBalanceComponent;
  let fixture: ComponentFixture<DeleteDepositNewBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDepositNewBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDepositNewBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

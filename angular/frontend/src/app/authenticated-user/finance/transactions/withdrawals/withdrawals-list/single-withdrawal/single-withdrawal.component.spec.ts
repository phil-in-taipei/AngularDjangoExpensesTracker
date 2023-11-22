import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWithdrawalComponent } from './single-withdrawal.component';

describe('SingleWithdrawalComponent', () => {
  let component: SingleWithdrawalComponent;
  let fixture: ComponentFixture<SingleWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalSubmitFormComponent } from './withdrawal-submit-form.component';

describe('WithdrawalSubmitFormComponent', () => {
  let component: WithdrawalSubmitFormComponent;
  let fixture: ComponentFixture<WithdrawalSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

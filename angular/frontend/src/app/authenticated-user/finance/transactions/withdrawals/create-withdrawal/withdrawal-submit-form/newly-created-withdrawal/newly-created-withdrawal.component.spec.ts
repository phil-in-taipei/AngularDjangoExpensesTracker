import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlyCreatedWithdrawalComponent } from './newly-created-withdrawal.component';

describe('NewlyCreatedWithdrawalComponent', () => {
  let component: NewlyCreatedWithdrawalComponent;
  let fixture: ComponentFixture<NewlyCreatedWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlyCreatedWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlyCreatedWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

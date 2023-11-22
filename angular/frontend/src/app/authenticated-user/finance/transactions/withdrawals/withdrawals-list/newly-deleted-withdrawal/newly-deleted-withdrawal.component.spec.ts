import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlyDeletedWithdrawalComponent } from './newly-deleted-withdrawal.component';

describe('NewlyDeletedWithdrawalComponent', () => {
  let component: NewlyDeletedWithdrawalComponent;
  let fixture: ComponentFixture<NewlyDeletedWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlyDeletedWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlyDeletedWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

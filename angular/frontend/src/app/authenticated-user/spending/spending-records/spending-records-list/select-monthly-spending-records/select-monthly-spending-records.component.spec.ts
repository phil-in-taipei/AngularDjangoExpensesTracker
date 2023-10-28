import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMonthlySpendingRecordsComponent } from './select-monthly-spending-records.component';

describe('SelectMonthlySpendingRecordsComponent', () => {
  let component: SelectMonthlySpendingRecordsComponent;
  let fixture: ComponentFixture<SelectMonthlySpendingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMonthlySpendingRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMonthlySpendingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

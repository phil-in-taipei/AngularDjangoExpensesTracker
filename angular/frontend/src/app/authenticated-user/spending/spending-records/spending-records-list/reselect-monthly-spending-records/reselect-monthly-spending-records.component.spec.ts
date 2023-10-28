import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReselectMonthlySpendingRecordsComponent } from './reselect-monthly-spending-records.component';

describe('ReselectMonthlySpendingRecordsComponent', () => {
  let component: ReselectMonthlySpendingRecordsComponent;
  let fixture: ComponentFixture<ReselectMonthlySpendingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReselectMonthlySpendingRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReselectMonthlySpendingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSpendingRecordComponent } from './single-spending-record.component';

describe('SingleSpendingRecordComponent', () => {
  let component: SingleSpendingRecordComponent;
  let fixture: ComponentFixture<SingleSpendingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSpendingRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSpendingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpendingRecordComponent } from './create-spending-record.component';

describe('CreateSpendingRecordComponent', () => {
  let component: CreateSpendingRecordComponent;
  let fixture: ComponentFixture<CreateSpendingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSpendingRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpendingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

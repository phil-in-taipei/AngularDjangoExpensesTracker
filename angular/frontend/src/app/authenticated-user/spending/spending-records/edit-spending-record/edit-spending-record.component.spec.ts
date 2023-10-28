import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpendingRecordComponent } from './edit-spending-record.component';

describe('EditSpendingRecordComponent', () => {
  let component: EditSpendingRecordComponent;
  let fixture: ComponentFixture<EditSpendingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpendingRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpendingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

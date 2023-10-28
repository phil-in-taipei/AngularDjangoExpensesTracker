import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpendingRecordFormComponent } from './edit-spending-record-form.component';

describe('EditSpendingRecordFormComponent', () => {
  let component: EditSpendingRecordFormComponent;
  let fixture: ComponentFixture<EditSpendingRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpendingRecordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpendingRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

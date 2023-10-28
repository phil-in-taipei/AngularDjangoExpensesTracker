import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingRecordSubmitFormComponent } from './spending-record-submit-form.component';

describe('SpendingRecordSubmitFormComponent', () => {
  let component: SpendingRecordSubmitFormComponent;
  let fixture: ComponentFixture<SpendingRecordSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingRecordSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingRecordSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

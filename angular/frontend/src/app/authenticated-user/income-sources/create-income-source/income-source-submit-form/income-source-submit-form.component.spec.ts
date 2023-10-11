import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSourceSubmitFormComponent } from './income-source-submit-form.component';

describe('IncomeSourceSubmitFormComponent', () => {
  let component: IncomeSourceSubmitFormComponent;
  let fixture: ComponentFixture<IncomeSourceSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeSourceSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSourceSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

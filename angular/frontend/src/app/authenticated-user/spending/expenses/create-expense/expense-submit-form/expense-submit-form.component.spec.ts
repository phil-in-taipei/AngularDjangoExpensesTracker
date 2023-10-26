import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSubmitFormComponent } from './expense-submit-form.component';

describe('ExpenseSubmitFormComponent', () => {
  let component: ExpenseSubmitFormComponent;
  let fixture: ComponentFixture<ExpenseSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

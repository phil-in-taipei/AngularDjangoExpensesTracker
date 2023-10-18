import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncomeSourceFormComponent } from './edit-income-source-form.component';

describe('EditIncomeSourceFormComponent', () => {
  let component: EditIncomeSourceFormComponent;
  let fixture: ComponentFixture<EditIncomeSourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIncomeSourceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncomeSourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

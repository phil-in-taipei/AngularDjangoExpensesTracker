import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncomeSourceComponent } from './edit-income-source.component';

describe('EditIncomeSourceComponent', () => {
  let component: EditIncomeSourceComponent;
  let fixture: ComponentFixture<EditIncomeSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIncomeSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncomeSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

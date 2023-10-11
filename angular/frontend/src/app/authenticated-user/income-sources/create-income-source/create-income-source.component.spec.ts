import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncomeSourceComponent } from './create-income-source.component';

describe('CreateIncomeSourceComponent', () => {
  let component: CreateIncomeSourceComponent;
  let fixture: ComponentFixture<CreateIncomeSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIncomeSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncomeSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

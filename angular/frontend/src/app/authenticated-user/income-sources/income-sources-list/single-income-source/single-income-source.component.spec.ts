import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleIncomeSourceComponent } from './single-income-source.component';

describe('SingleIncomeSourceComponent', () => {
  let component: SingleIncomeSourceComponent;
  let fixture: ComponentFixture<SingleIncomeSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleIncomeSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleIncomeSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

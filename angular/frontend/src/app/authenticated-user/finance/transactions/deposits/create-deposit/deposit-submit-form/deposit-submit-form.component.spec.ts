import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositSubmitFormComponent } from './deposit-submit-form.component';

describe('DepositSubmitFormComponent', () => {
  let component: DepositSubmitFormComponent;
  let fixture: ComponentFixture<DepositSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

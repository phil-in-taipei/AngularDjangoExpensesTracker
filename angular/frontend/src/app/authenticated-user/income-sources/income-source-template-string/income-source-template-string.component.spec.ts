import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSourceTemplateStringComponent } from './income-source-template-string.component';

describe('IncomeSourceTemplateStringComponent', () => {
  let component: IncomeSourceTemplateStringComponent;
  let fixture: ComponentFixture<IncomeSourceTemplateStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeSourceTemplateStringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSourceTemplateStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

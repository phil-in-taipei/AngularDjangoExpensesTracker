import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsAccountTemplateStringComponent } from './savings-account-template-string.component';

describe('SavingsAccountTemplateStringComponent', () => {
  let component: SavingsAccountTemplateStringComponent;
  let fixture: ComponentFixture<SavingsAccountTemplateStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsAccountTemplateStringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsAccountTemplateStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

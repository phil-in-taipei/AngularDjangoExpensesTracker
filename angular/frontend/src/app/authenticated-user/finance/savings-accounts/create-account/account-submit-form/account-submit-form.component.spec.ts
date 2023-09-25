import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubmitFormComponent } from './account-submit-form.component';

describe('AccountSubmitFormComponent', () => {
  let component: AccountSubmitFormComponent;
  let fixture: ComponentFixture<AccountSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

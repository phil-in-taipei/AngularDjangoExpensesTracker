import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSavingsAccountComponent } from './single-savings-account.component';

describe('SingleSavingsAccountComponent', () => {
  let component: SingleSavingsAccountComponent;
  let fixture: ComponentFixture<SingleSavingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSavingsAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSavingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

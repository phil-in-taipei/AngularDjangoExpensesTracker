import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlyCreatedDepositComponent } from './newly-created-deposit.component';

describe('NewlyCreatedDepositComponent', () => {
  let component: NewlyCreatedDepositComponent;
  let fixture: ComponentFixture<NewlyCreatedDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlyCreatedDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlyCreatedDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlyDeletedDepositComponent } from './newly-deleted-deposit.component';

describe('NewlyDeletedDepositComponent', () => {
  let component: NewlyDeletedDepositComponent;
  let fixture: ComponentFixture<NewlyDeletedDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlyDeletedDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlyDeletedDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

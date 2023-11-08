import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedTransactionsByAccountListComponent } from './mixed-transactions-by-account-list.component';

describe('MixedTransactionsByAccountListComponent', () => {
  let component: MixedTransactionsByAccountListComponent;
  let fixture: ComponentFixture<MixedTransactionsByAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedTransactionsByAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedTransactionsByAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

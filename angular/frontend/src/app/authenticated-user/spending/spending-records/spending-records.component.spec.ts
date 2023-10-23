import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingRecordsComponent } from './spending-records.component';

describe('SpendingRecordsComponent', () => {
  let component: SpendingRecordsComponent;
  let fixture: ComponentFixture<SpendingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

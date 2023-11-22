import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedByAccountComponent } from './mixed-by-account.component';

describe('MixedByAccountComponent', () => {
  let component: MixedByAccountComponent;
  let fixture: ComponentFixture<MixedByAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedByAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedByAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

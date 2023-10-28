import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NgForm } from '@angular/forms';
import {select, Store } from '@ngrx/store';

import { AppState } from '../../../../../reducers';
import { 
  getYearsOptions, monthsAndIntegers 
} from 'src/app/shared-utils/date-helpers.util';
import { SpendingRecordsCleared, SpendingRecordsRequested } from '../../spending-records.actions';

@Component({
  selector: 'app-select-monthly-spending-records',
  templateUrl: './select-monthly-spending-records.component.html',
  styleUrls: ['./select-monthly-spending-records.component.css']
})
export class SelectMonthlySpendingRecordsComponent implements OnInit {

  years: Number[] = [];
  @Output() closeCalendarFormEvent = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.years = getYearsOptions();
  }

  onSubmitCalendar(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {

      return;
    }
    this.store.dispatch(new SpendingRecordsCleared);
    console.log('valid!')
    this.store.dispatch(new SpendingRecordsRequested(
      {month: form.value.month, year: form.value.year }
    ));
    this.closeCalendarFormEvent.emit(false);
  }
}

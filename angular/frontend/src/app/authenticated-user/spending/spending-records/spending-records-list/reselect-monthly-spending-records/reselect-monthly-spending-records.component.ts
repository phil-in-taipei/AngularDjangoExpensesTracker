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
  selector: 'app-reselect-monthly-spending-records',
  templateUrl: './reselect-monthly-spending-records.component.html',
  styleUrls: ['./reselect-monthly-spending-records.component.css']
})
export class ReselectMonthlySpendingRecordsComponent implements OnInit {

  @Input() monthlyDateRange: [string, string];
  years: Number[] = [];
  @Output() closeMonthlySelectFormEvent = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.years = getYearsOptions();
  }

  onSubmitCalendar(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      console.log(form.errors);
      return;
    }
    let previousYear = +this.monthlyDateRange[0].split('-')[0];
    let previousMonth = +this.monthlyDateRange[0].split('-')[1];
    console.log(previousYear);
    console.log(previousMonth);
    if (+form.value.month === previousMonth && +form.value.year === previousYear) {
      console.log('it is the same month/year')
      this.closeMonthlySelectFormEvent.emit(false);
    } else {
      this.store.dispatch(new SpendingRecordsCleared);
      this.store.dispatch(new SpendingRecordsRequested(
        {month: form.value.month, year: form.value.year }))
      this.closeMonthlySelectFormEvent.emit(false);
    }
  }
}

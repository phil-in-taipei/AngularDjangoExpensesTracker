import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import {select, Store } from '@ngrx/store';

import { AppState } from '../../../../reducers';
import { 
  getYearsOptions, monthsAndIntegers 
} from 'src/app/shared-utils/date-helpers.util';

import { 
  selectMonthlySpendingRecords, spendingRecordsDateRange, 
  spendingRecordsErrorMsg, spendingRecordsLoaded 
} from '../spending-records.selectors';
import { SpendingRecordModel } from 'src/app/models/spending-record.model';

@Component({
  selector: 'app-spending-records',
  templateUrl: './spending-records.component.html',
  styleUrls: ['./spending-records.component.css']
})
export class SpendingRecordsComponent implements OnInit {

  spendingRecords$: Observable<SpendingRecordModel[] | undefined> = of(undefined);
  spendingRecordsdLoaded$: Observable<boolean> = of(false);
  monthlyDateRange$: Observable<[string, string] | undefined> = of(undefined);
  showMonthlySelectForm: Boolean = true;
  years: Number[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.spendingRecords$ = this.store.pipe(select(selectMonthlySpendingRecords));
    this.monthlyDateRange$ = this.store.pipe(select(spendingRecordsDateRange));
    this.spendingRecordsdLoaded$ = this.store.pipe(select(spendingRecordsLoaded));
    this.years = getYearsOptions();
  }

  closeMonthlySelectFormHander($event: boolean) {
    this.showMonthlySelectForm = $event;
  }

  toggleCalendarSubmitForm() {
    if (this.showMonthlySelectForm) {
      this.showMonthlySelectForm = false;
    } else {
      this.showMonthlySelectForm = true;
    }
  }
}

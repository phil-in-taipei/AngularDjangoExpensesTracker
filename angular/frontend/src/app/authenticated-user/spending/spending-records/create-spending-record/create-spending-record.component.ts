import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';
import { CurrencyModel } from 'src/app/models/currency.model';
import { ExpenseModel } from 'src/app/models/expense.model';
import { selectAllCurrencies } from 'src/app/authenticated-user/currencies/currencies.selectors';
import { selectAllExpenses } from '../../expenses/expenses.selectors';
import { 
  spendingRecordsErrorMsg, spendingRecordsSuccessMsg 
} from '../spending-records.selectors';
import { SpendingRecordsMessagesCleared } from '../spending-records.actions';

@Component({
  selector: 'app-create-spending-record',
  templateUrl: './create-spending-record.component.html',
  styleUrls: ['./create-spending-record.component.css']
})
export class CreateSpendingRecordComponent implements OnInit {

  submitErrMsg$: Observable<string | undefined> = of(undefined);
  submitSuccessMsg$: Observable<string | undefined> = of(undefined);
  currencies$: Observable<CurrencyModel[]>;
  expenses$: Observable<ExpenseModel[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new SpendingRecordsMessagesCleared());
    this.expenses$ = this.store.pipe(select(selectAllExpenses));
    this.currencies$ = this.store.pipe(select(selectAllCurrencies));
    this.submitErrMsg$ = this.store.pipe(
                select(spendingRecordsErrorMsg)
              );
    this.submitSuccessMsg$ = this.store.pipe(
                select(spendingRecordsSuccessMsg)
              );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new SpendingRecordsMessagesCleared());
  }

}

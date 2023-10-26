import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";
import { AppState } from 'src/app/reducers';

import { expensesErrorMsg, expensesSuccessMsg } from '../expenses.selectors';
import { ExpensesMessagesCleared } from '../expenses.actions';
import { selectUserProfile } from 'src/app/authenticated-user/user.selectors';
import { UserProfileModel } from 'src/app/models/user-profile.model';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  expenseSubmitErrMsg$: Observable<string | undefined>;
  expenseSubmitSuccessMsg$: Observable<string | undefined>;
  usrProfile$: Observable<UserProfileModel | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new ExpensesMessagesCleared());
    this.usrProfile$ = this.store.pipe(select(selectUserProfile));
    this.expenseSubmitErrMsg$ = this.store.pipe(
                select(expensesErrorMsg)
              );
    this.expenseSubmitSuccessMsg$ = this.store.pipe(
                select(expensesSuccessMsg)
              );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new ExpensesMessagesCleared());
  }
}

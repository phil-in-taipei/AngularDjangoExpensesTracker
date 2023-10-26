import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";
import { AppState } from 'src/app/reducers';

import { expensesErrorMsg, expensesSuccessMsg } from '../expenses.selectors';
import { ExpensesMessagesCleared } from '../expenses.actions';
import { ExpenseModel } from 'src/app/models/expense.model';
import { selectExpenseById } from '../expenses.selectors';
import { selectUserProfile } from 'src/app/authenticated-user/user.selectors';
import { UserProfileModel } from 'src/app/models/user-profile.model';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  expense$: Observable<ExpenseModel | undefined>;
  expenseSubmitErrMsg$: Observable<string | undefined>;
  expenseSubmitSuccessMsg$: Observable<string | undefined>;
  idFromRouteData:number;
  usrProfile$: Observable<UserProfileModel | undefined>;

  constructor(private route: ActivatedRoute, 
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new ExpensesMessagesCleared());
    this.idFromRouteData = this.route.snapshot.params['id'];
    this.expense$ = this.store.pipe(select(
      selectExpenseById(this.idFromRouteData)
    ));
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

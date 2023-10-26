import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";
import { AppState } from 'src/app/reducers';

import { ExpenseModel } from 'src/app/models/expense.model';
import { selectAllExpenses } from '../expenses.selectors';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenses$: Observable<ExpenseModel[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.expenses$ = this.store.pipe(
      select(selectAllExpenses)
    );
  }

}

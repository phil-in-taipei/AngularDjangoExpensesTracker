import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { ExpenseModel } from 'src/app/models/expense.model';
import { ExpenseDeletionRequested } from '../../expenses.actions';

@Component({
  selector: 'app-single-expense',
  templateUrl: './single-expense.component.html',
  styleUrls: ['./single-expense.component.css']
})
export class SingleExpenseComponent implements OnInit {

  @Input() expense: ExpenseModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveExpense() {
    const payload = { id: +this.expense.id };
    this.store.dispatch(
      new ExpenseDeletionRequested(payload)
    );
  }
}

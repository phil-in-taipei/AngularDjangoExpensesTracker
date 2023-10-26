import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { ExpenseCreateAndUpdateModel } from 'src/app/models/expense.model';
import { ExpenseAddedCancelled, ExpenseSubmitted } from '../../expenses.actions';
import { UserProfileModel } from 'src/app/models/user-profile.model';

@Component({
  selector: 'app-expense-submit-form',
  templateUrl: './expense-submit-form.component.html',
  styleUrls: ['./expense-submit-form.component.css']
})
export class ExpenseSubmitFormComponent implements OnInit {

  @Input() usrProfile: UserProfileModel;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmitExpense(form: NgForm) {
    if (form.invalid) {
      this.store.dispatch(new ExpenseAddedCancelled({err: {
        error: {
          Error: "The form values were not properly filled in!"
        }
      }} ));
      return;
    }
    const data: ExpenseCreateAndUpdateModel = {
      expense_name: form.value.expense_name
    };
    this.store.dispatch(
      new ExpenseSubmitted({ expense: data })
      );
    form.reset();
  };

}

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store} from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { 
  ExpenseCreateAndUpdateModel, ExpenseModel 
} from 'src/app/models/expense.model';
import { 
  ExpenseEditCancelled, ExpenseEditSubmitted 
} from '../../expenses.actions';

@Component({
  selector: 'app-expense-edit-form',
  templateUrl: './expense-edit-form.component.html',
  styleUrls: ['./expense-edit-form.component.css']
})
export class ExpenseEditFormComponent implements OnInit {

  @Input() expense: ExpenseModel;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmitEditedExpense(form: NgForm) {
    if (form.invalid) {
      this.store.dispatch(new ExpenseEditCancelled({err: {
        error: {
          Error: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let editedExpenseData: ExpenseCreateAndUpdateModel = {
      expense_name: form.value.expense_name
    }
    this.store.dispatch(new ExpenseEditSubmitted(
      {  id: this.expense.id, expense: editedExpenseData }
    ));
    form.resetForm();
  }


}

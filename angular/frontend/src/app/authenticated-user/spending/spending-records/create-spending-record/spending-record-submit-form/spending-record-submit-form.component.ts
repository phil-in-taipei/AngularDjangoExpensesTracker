import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { CurrencyModel } from 'src/app/models/currency.model';
import { ExpenseModel } from 'src/app/models/expense.model';
import { SpendingRecordCreateModel } from 'src/app/models/spending-record.model';
import { 
  SpendingRecordAddedCancelled, SpendingRecordSubmitted 
} from '../../spending-records.actions';

@Component({
  selector: 'app-spending-record-submit-form',
  templateUrl: './spending-record-submit-form.component.html',
  styleUrls: ['./spending-record-submit-form.component.css']
})
export class SpendingRecordSubmitFormComponent implements OnInit {

  @Input() currencies: CurrencyModel[];
  @Input() expenses: ExpenseModel[];
  dateModel: Date;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmitSpendingRecord(form: NgForm) {
    if (form.invalid) {
      this.store.dispatch(new SpendingRecordAddedCancelled({err: {
        error: {
          Error: "The form values were not properly filled in!"
        }
      }} ));
      return;
    }
    const data: SpendingRecordCreateModel = {
      date: `${form.value.date.year}-${form.value.date.month}-${form.value.date.day}`,
      amount: form.value.amount,
      expense: form.value.expense,
      currency: form.value.currency,
    };
    this.store.dispatch(
      new SpendingRecordSubmitted({ spendingRecord: data })
      );
    form.reset();
  };


}

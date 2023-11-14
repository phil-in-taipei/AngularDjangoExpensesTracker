import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';

import { TransactionModel } from 'src/app/models/transaction-model';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';

import { selectSavingsAccountById } from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';

@Component({
  selector: 'app-newly-created-deposit',
  templateUrl: './newly-created-deposit.component.html',
  styleUrls: ['./newly-created-deposit.component.css']
})
export class NewlyCreatedDepositComponent implements OnInit {

  @Input() deposit: TransactionModel;
  savingsAccount$: Observable<SavingsAccountModel | undefined>;
  accountSubmitSuccessMsg$: Observable<string | undefined> = of(undefined);
  

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log('this is the deposit: ')
    console.log(this.deposit)
    console.log('now getting the savings account async:')
    this.savingsAccount$ = this.store.pipe(select(
      selectSavingsAccountById(this.deposit.savings_account)
    ));
    // this has to go into a child component:

  }

}

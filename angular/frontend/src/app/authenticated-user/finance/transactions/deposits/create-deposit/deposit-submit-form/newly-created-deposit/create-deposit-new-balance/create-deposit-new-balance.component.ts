import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { SavingsAccountDepositSaved } from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.actions';
import { TransactionModel } from 'src/app/models/transaction-model';
import { SavingsAccountMessagesCleared } from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.actions';
import { savingsAccountSuccessMsg } from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';

@Component({
  selector: 'app-create-deposit-new-balance',
  templateUrl: './create-deposit-new-balance.component.html',
  styleUrls: ['./create-deposit-new-balance.component.css']
})
export class CreateDepositNewBalanceComponent implements OnInit {

  @Input() deposit: TransactionModel;
  @Input() savingsAccount: SavingsAccountModel;
  accountSubmitSuccessMsg$: Observable<string | undefined> = of(undefined);


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    let payload = {
      amount: this.deposit.amount,
      savingsAccount: this.savingsAccount
    }

    this.store.dispatch(
      new SavingsAccountDepositSaved(payload)
    );
    this.accountSubmitSuccessMsg$ = this.store.pipe(
      select(savingsAccountSuccessMsg)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new SavingsAccountMessagesCleared());
  }
}

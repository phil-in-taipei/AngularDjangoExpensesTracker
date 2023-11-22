import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { 
  SavingsAccountWithdrawalSaved 
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.actions';
import { TransactionModel } from 'src/app/models/transaction-model';
import { 
  SavingsAccountMessagesCleared 
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.actions';
import { 
  savingsAccountSuccessMsg 
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';

@Component({
  selector: 'app-create-withdrawal-new-balance',
  templateUrl: './create-withdrawal-new-balance.component.html',
  styleUrls: ['./create-withdrawal-new-balance.component.css']
})
export class CreateWithdrawalNewBalanceComponent implements OnInit {

  @Input() withdrawal: TransactionModel;
  @Input() savingsAccount: SavingsAccountModel;
  accountSubmitSuccessMsg$: Observable<string | undefined> = of(undefined);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    let payload = {
      amount: this.withdrawal.amount,
      savingsAccount: this.savingsAccount
    }

    this.store.dispatch(
      new SavingsAccountWithdrawalSaved(payload)
    );
    this.accountSubmitSuccessMsg$ = this.store.pipe(
      select(savingsAccountSuccessMsg)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new SavingsAccountMessagesCleared());
  }
}

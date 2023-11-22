import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { 
  SavingsAccountWithdrawalDeletionSaved 
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.actions';
import { 
  TransactionDeletionResponse 
} from 'src/app/models/transaction-model';
import { 
  SavingsAccountMessagesCleared 
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.actions';
import { 
  savingsAccountSuccessMsg 
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';


@Component({
  selector: 'app-delete-withdrawal-new-balance',
  templateUrl: './delete-withdrawal-new-balance.component.html',
  styleUrls: ['./delete-withdrawal-new-balance.component.css']
})
export class DeleteWithdrawalNewBalanceComponent implements OnInit {

  @Input() withdrawalDeletionResponse: TransactionDeletionResponse;
  @Input() savingsAccount: SavingsAccountModel;
  accountSubmitSuccessMsg$: Observable<string | undefined> = of(undefined);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    let payload = {
      amount: this.withdrawalDeletionResponse.amount,
      savingsAccount: this.savingsAccount
    }

    this.store.dispatch(
      new SavingsAccountWithdrawalDeletionSaved(payload)
    );
    this.accountSubmitSuccessMsg$ = this.store.pipe(
      select(savingsAccountSuccessMsg)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new SavingsAccountMessagesCleared());
  }
}

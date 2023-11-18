import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { TransactionDeletionResponse } from 'src/app/models/transaction-model';
import { selectSavingsAccountById } from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';

@Component({
  selector: 'app-newly-deleted-deposit',
  templateUrl: './newly-deleted-deposit.component.html',
  styleUrls: ['./newly-deleted-deposit.component.css']
})
export class NewlyDeletedDepositComponent implements OnInit {

  @Input() depositDeletionResponse: TransactionDeletionResponse;
  savingsAccount$: Observable<SavingsAccountModel | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.savingsAccount$ = this.store.pipe(select(
      selectSavingsAccountById(this.depositDeletionResponse.savings_account)
    ));
  }

}

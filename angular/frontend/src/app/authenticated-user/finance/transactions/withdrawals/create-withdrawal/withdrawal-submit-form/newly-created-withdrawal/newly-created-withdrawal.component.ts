import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { TransactionModel } from 'src/app/models/transaction-model';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { selectSavingsAccountById } from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';

@Component({
  selector: 'app-newly-created-withdrawal',
  templateUrl: './newly-created-withdrawal.component.html',
  styleUrls: ['./newly-created-withdrawal.component.css']
})
export class NewlyCreatedWithdrawalComponent implements OnInit {


  @Input() withdrawal: TransactionModel;
  savingsAccount$: Observable<SavingsAccountModel | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.savingsAccount$ = this.store.pipe(select(
      selectSavingsAccountById(this.withdrawal.savings_account)
    ));
  }

}

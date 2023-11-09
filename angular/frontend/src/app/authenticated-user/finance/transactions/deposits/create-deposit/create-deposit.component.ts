import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { IncomeSourceModel } from 'src/app/models/income-source.model';
import {
  selectAllIncomeSources
} from 'src/app/authenticated-user/income-sources/income-sources.selectors';
import {
  selectAllSavingsAccounts
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrls: ['./create-deposit.component.css']
})
export class CreateDepositComponent implements OnInit {

  savingsAccounts$: Observable<SavingsAccountModel[] | undefined> = of(undefined);
  incomeSources$: Observable<IncomeSourceModel[] | undefined> = of(undefined);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.savingsAccounts$ = this.store.pipe(select(selectAllSavingsAccounts));
    this.incomeSources$ = this.store.pipe(select(selectAllIncomeSources));
  }

}

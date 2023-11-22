import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import {
  selectAllSavingsAccounts
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.selectors';

@Component({
  selector: 'app-mixed-by-account',
  templateUrl: './mixed-by-account.component.html',
  styleUrls: ['./mixed-by-account.component.css']
})
export class MixedByAccountComponent implements OnInit {

  savingsAccounts$: Observable<SavingsAccountModel[] | undefined> = of(undefined);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.savingsAccounts$ = this.store.pipe(select(selectAllSavingsAccounts));
  }

}

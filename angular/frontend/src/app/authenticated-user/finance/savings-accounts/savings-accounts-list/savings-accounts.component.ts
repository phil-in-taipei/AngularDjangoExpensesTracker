import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";
import { AppState } from 'src/app/reducers';

import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { selectAllSavingsAccounts } from '../savings-accounts.selectors';

@Component({
  selector: 'app-savings-accounts',
  templateUrl: './savings-accounts.component.html',
  styleUrls: ['./savings-accounts.component.css']
})
export class SavingsAccountsComponent implements OnInit {

  savingsAccounts$: Observable<SavingsAccountModel[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.savingsAccounts$ = this.store.pipe(
      select(selectAllSavingsAccounts)
    );
  }

}

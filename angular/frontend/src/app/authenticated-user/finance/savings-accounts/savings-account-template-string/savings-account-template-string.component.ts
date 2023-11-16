import { Component, Input, OnInit } from '@angular/core';
import {select, Store } from '@ngrx/store';
import { of, Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';

import { selectSavingsAccountById } from '../savings-accounts.selectors';

@Component({
  selector: 'app-savings-account-template-string',
  templateUrl: './savings-account-template-string.component.html',
  styleUrls: ['./savings-account-template-string.component.css']
})
export class SavingsAccountTemplateStringComponent implements OnInit {

  savingsAccount$: Observable<SavingsAccountModel | undefined> = of(undefined);
  @Input() savingsAccountId: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.savingsAccount$ = this.store.pipe(select(
      selectSavingsAccountById(this.savingsAccountId)
    ));
  }

}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { AppState } from 'src/app/reducers';
import { BankModel } from 'src/app/models/bank.model';
import { IncomeSourceModel } from 'src/app/models/income-source.model';
import { selectAllBanks } from 'src/app/authenticated-user/banks/banks.selectors';
import { 
  selectAllIncomeSources 
} from 'src/app/authenticated-user/income-sources/income-sources.selectors';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrls: ['./create-deposit.component.css']
})
export class CreateDepositComponent implements OnInit {

  banks$: Observable<BankModel[] | undefined> = of(undefined);
  incomeSources$: Observable<IncomeSourceModel[] | undefined> = of(undefined);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.banks$ = this.store.pipe(select(selectAllBanks));
    this.incomeSources$ = this.store.pipe(select(selectAllIncomeSources));
  }

}

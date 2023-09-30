import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {select, Store } from '@ngrx/store';
import { Observable, map } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { selectSavingsAccountById } from '../savings-accounts.selectors';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  idFromRouteData:number;
  savingsAccount$: Observable<SavingsAccountModel | undefined>;

  constructor(private route: ActivatedRoute, 
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.savingsAccount$ = this.store.pipe(select(
      selectSavingsAccountById(this.idFromRouteData)
    ))
  };

  

}

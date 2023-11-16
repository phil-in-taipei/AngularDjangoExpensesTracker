import { Component, Input, OnInit } from '@angular/core';
import {select, Store } from '@ngrx/store';
import { of, Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { IncomeSourceModel } from 'src/app/models/income-source.model';
import { selectIncomeSourcesById } from '../income-sources.selectors';

@Component({
  selector: 'app-income-source-template-string',
  templateUrl: './income-source-template-string.component.html',
  styleUrls: ['./income-source-template-string.component.css']
})
export class IncomeSourceTemplateStringComponent implements OnInit {

  incomeSource$: Observable<IncomeSourceModel | undefined> = of(undefined);
  @Input() incomeSourceId: number;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.incomeSource$ = this.store.pipe(select(
      selectIncomeSourcesById(this.incomeSourceId)
    ));
  }
}

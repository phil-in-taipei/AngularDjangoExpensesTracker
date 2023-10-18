import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { IncomeSourceModel } from 'src/app/models/income-source.model';
import { IncomeSourceDeletionRequested } from '../../income-sources.actions';

@Component({
  selector: 'app-single-income-source',
  templateUrl: './single-income-source.component.html',
  styleUrls: ['./single-income-source.component.css']
})
export class SingleIncomeSourceComponent implements OnInit {

  @Input() incomeSource: IncomeSourceModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveIncomeSource() {
    const payload = { id: +this.incomeSource.id };
    this.store.dispatch(
      new IncomeSourceDeletionRequested(payload)
    );
  }

}

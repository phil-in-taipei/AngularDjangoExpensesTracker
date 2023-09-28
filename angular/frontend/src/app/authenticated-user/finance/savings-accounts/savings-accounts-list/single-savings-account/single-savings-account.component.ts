import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { SavingsAccountDeletionRequested } from '../../savings-accounts.actions';

@Component({
  selector: 'app-single-savings-account',
  templateUrl: './single-savings-account.component.html',
  styleUrls: ['./single-savings-account.component.css']
})
export class SingleSavingsAccountComponent implements OnInit {

  @Input() savingsAccount: SavingsAccountModel;

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

  onRemoveSavingsAccount() {
    const payload = { id: +this.savingsAccount.id };
    this.store.dispatch(
      new SavingsAccountDeletionRequested(payload)
    );
  }

}

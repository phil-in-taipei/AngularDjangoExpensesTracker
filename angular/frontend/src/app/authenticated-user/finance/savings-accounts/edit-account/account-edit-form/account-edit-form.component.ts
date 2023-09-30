import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store} from '@ngrx/store';

import { AppState } from 'src/app/reducers';

import { 
  SavingsAccountEditModel, SavingsAccountModel 
} from 'src/app/models/savings-account.model';
import { SavingsAccountEditCancelled, 
  SavingsAccountEditSubmitted } from '../../savings-accounts.actions';

@Component({
  selector: 'app-account-edit-form',
  templateUrl: './account-edit-form.component.html',
  styleUrls: ['./account-edit-form.component.css']
})
export class AccountEditFormComponent implements OnInit {

  @Input() savingsAccount: SavingsAccountModel;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmitEditedSavingsAccount(form: NgForm) {
    console.log(form.value)
    if (form.invalid) {
      console.log('the form is invalid!')
      this.store.dispatch(new SavingsAccountEditCancelled({err: {
        error: {
          Error: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let editedAccountData: SavingsAccountEditModel = {
      account_balance: form.value.account_balance,
      account_name: form.value.account_name
    }
    this.store.dispatch(new SavingsAccountEditSubmitted(
      {  id: this.savingsAccount.id, savingsAccount: editedAccountData }
    ));
    form.resetForm();
  }

}

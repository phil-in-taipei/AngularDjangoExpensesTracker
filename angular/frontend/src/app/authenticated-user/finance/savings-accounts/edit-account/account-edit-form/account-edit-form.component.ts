import { Component, OnInit, Input } from '@angular/core';

import { 
  SavingsAccountEditModel, SavingsAccountModel 
} from 'src/app/models/savings-account.model';

@Component({
  selector: 'app-account-edit-form',
  templateUrl: './account-edit-form.component.html',
  styleUrls: ['./account-edit-form.component.css']
})
export class AccountEditFormComponent implements OnInit {

  @Input() savingsAccount: SavingsAccountModel;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

import { SavingsAccountModel } from 'src/app/models/savings-account.model';

@Component({
  selector: 'app-single-savings-account',
  templateUrl: './single-savings-account.component.html',
  styleUrls: ['./single-savings-account.component.css']
})
export class SingleSavingsAccountComponent implements OnInit {

  @Input() savingsAccount: SavingsAccountModel;

  constructor() { }

  ngOnInit(): void {
  }

}
